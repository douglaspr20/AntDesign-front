import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { INTERNAL_LINKS } from 'enum'
import moment from 'moment-timezone'
import { CustomButton } from 'components'
import { ReactComponent as IconArrowBackCircleOutline } from "images/icon-arrow-back-circle-outline.svg";

import { actions as skillCohortActions } from 'redux/actions/skillCohort-actions'
import { skillCohortSelector } from 'redux/selectors/skillCohortSelector'

import './style.scss'

moment().tz("America/Los_Angeles").format();

const SkillCohortDetail = ({
    getSkillCohort,
    skillCohort
}) => {
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            getSkillCohort(id)
        }
        // eslint-disable-next-line
    }, [id])

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
                        <div>{`${moment(skillCohort.startDate).format('LL')} - ${moment(skillCohort.endDate).format('LL')}`}</div>
                    </div>
                    <div className="skill-cohort-bottom-btn">
                        <CustomButton 
                            text="Join"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state) => ({
    ...skillCohortSelector(state)
})

const mapDispatchToProps = {
    ...skillCohortActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillCohortDetail)