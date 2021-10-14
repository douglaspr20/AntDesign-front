import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { INTERNAL_LINKS, EVENT_TYPES } from 'enum'
import moment from 'moment-timezone'
import { CustomButton, CustomModal } from 'components'
import Emitter from "services/emitter";
import { ReactComponent as IconArrowBackCircleOutline } from "images/icon-arrow-back-circle-outline.svg";
import { isEmpty } from 'lodash'

import { homeSelector } from "redux/selectors/homeSelector";
import { skillCohortSelector } from 'redux/selectors/skillCohortSelector'
import { skillCohortParticipantSelector } from 'redux/selectors/skillCohortParticipantSelector'

import { actions as skillCohortActions } from 'redux/actions/skillCohort-actions'
import { actions as skillCohortParticipantActions } from 'redux/actions/skillCohortParticipant-actions'

import './style.scss'

// moment().tz("America/Los_Angeles").format();

const SkillCohortDetail = ({
    getSkillCohort,
    skillCohort,
    userProfile,
    createSkillCohortParticipant,
    getSkillCohortParticipant,
    skillCohortParticipant,
}) => {
    const [showFirewall, setShowFirewall] = useState(false)
    const [hasCohortStarted, setHasCohortStarted] = useState(false)
    const [confirmModal, setConfirmModal] = useState(false)
    const [isDayBeforeStartDate, setIsDayBeforeStartDate] = useState(false)

    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        getSkillCohort(id)
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!isEmpty(skillCohort)) {
            const { startDate } = skillCohort
            const dateToday = moment().format('YYYY-MM-DD HH:mm:ssZ')

            if (dateToday === moment(startDate).startOf('day').subtract(1, 'days').format('YYYY-MM-DD HH:mm:ssZ')) {
                setHasCohortStarted(true)
                setIsDayBeforeStartDate(true)
            } else if (dateToday >= moment(startDate).format('YYYY-MM-DD HH:mm:ssZ')) {
                setHasCohortStarted(true)
            } else {
                setHasCohortStarted(false)
            }
        }

        // eslint-disable-next-line
    }, [skillCohort])

    useEffect(() => {
        if (userProfile.id) {
            getSkillCohortParticipant(id, userProfile.id)
        }
        // eslint-disable-next-line
    }, [userProfile])

    const planUpgrade = () => {
        Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
    }

    const handleOnJoin = () => {
        if (userProfile && userProfile.memberShip === 'premium') {
            if (hasCohortStarted && skillCohortParticipant.hasAccess) {
                history.push(`${INTERNAL_LINKS.SKILL_COHORTS}/${id}/resources`)
            } else {
                setConfirmModal(true)
            }
        } else{
            setShowFirewall(true)
        }
    }

    const displayFirewall = showFirewall && <div
        className="skill-cohort-firewall"
        onClick={() => setShowFirewall(false)}
    >
        <div className="upgrade-notification-panel" onClick={planUpgrade}>
        <h3>
            Upgrade to a PREMIUM Membership and get unlimited access to the
            LAB features
        </h3>
        </div>
    </div>

    let displayBtn;

    if (!isEmpty(skillCohort)) {
        if (hasCohortStarted) {
            if (skillCohortParticipant.hasAccess) {
                 if (isDayBeforeStartDate) {
                    displayBtn = `Starting on ${moment(skillCohort.startDate).format('LL')}`
                 } else {
                    displayBtn = "Enter Dashboard"
                 }
            } else {
                displayBtn = "Cohort has started."
            }
    
        } else {
            if (skillCohortParticipant.hasAccess) {
                displayBtn = `Starting on ${moment(skillCohort.startDate).format('LL')}`
            } else {
                displayBtn = "Join"
            }
        }
    } else {
        displayBtn = ''
    }

    const handleJoinSkillCohort = () => {
        setConfirmModal(false)
        createSkillCohortParticipant(skillCohort.id, userProfile.id)
    }

    const disabled = (hasCohortStarted && !skillCohortParticipant.hasAccess) || (!hasCohortStarted && skillCohortParticipant.hasAccess)
    const displayStartDateAndEndDate = `${moment(skillCohort.startDate).format('LL')} - ${moment(skillCohort.endDate).format('LL')}`

    return (
        <>
            <div className="skill-cohort-detail-page">
                <div className="back-btn" onClick={() => history.push(INTERNAL_LINKS.SKILL_COHORTS)}>
                    <IconArrowBackCircleOutline 
                        style={{height: '32px'}}
                        title="Back to Skill Cohort List"
                    />
                    <h3>Back to Skill Cohort List</h3>
                </div>
                <div className="skill-cohort-content-wrapper">
                    <div className="skill-cohort-content">
                        <h2>Title</h2>
                        <div>{skillCohort.title}</div>
                    </div>
                    <div className="skill-cohort-content">
                        <h2>Description</h2>
                        <div>{skillCohort.description}</div>
                    </div>
                    <div className="skill-cohort-content">
                        <h2>Learning Objectives</h2>
                        <div>{skillCohort.objectives}</div>
                    </div>
                    <div className="skill-cohort-content">
                        <h2>Schedule</h2>
                        <div>{displayStartDateAndEndDate}</div>
                    </div>
                    <div className="skill-cohort-bottom-btn">
                        <CustomButton 
                            text={displayBtn}
                            htmlType="button"
                            onClick={handleOnJoin}
                            disabled={disabled || isDayBeforeStartDate}
                        />
                    </div>
                    {displayFirewall}
                </div>
                <CustomModal
                    visible={confirmModal}
                    title="Join this cohort?"
                    subTitle="Click confirm if you want to join"
                    onCancel={() => setConfirmModal(false)}
                    width={376}
                >
                    <div className="confirm-modal">
                        <CustomButton
                            text="Cancel"
                            type="primary outlined"
                            htmlType="button"
                            onClick={() => setConfirmModal(false)}
                        />
                        <CustomButton
                            text="Confirm"
                            type="primary"
                            htmlType="button"
                            onClick={handleJoinSkillCohort}
                        />
                    </div>
                </CustomModal>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    ...skillCohortSelector(state),
    ...skillCohortParticipantSelector(state),
    userProfile: homeSelector(state).userProfile
})

const mapDispatchToProps = {
    ...skillCohortActions,
    ...skillCohortParticipantActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillCohortDetail)