import { Row, Col } from 'antd'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import moment from 'moment-timezone'
import { useParams } from 'react-router-dom'
import { initial, isEmpty } from 'lodash'

import { skillCohortResourceSelector } from 'redux/selectors/skillCohortResourceSelector'
import { skillCohortParticipantSelector } from 'redux/selectors/skillCohortParticipantSelector'
import { homeSelector } from 'redux/selectors/homeSelector'

import { actions as skillCohortResourceActions } from 'redux/actions/skillCohortResource-actions'
import { actions as skillCohortParticipantActions } from 'redux/actions/skillCohortParticipant-actions'

import ResourceCard from './ResourceCard'
import './style.scss'

const SkillCohortResources = ({
    getAllSkillCohortResources,
    allSkillCohortResources,
    getSkillCohortParticipant,
    skillCohortParticipant,
    userProfile
}) => {
    const dateToday = moment().tz("America/Los_Angeles")
    const { id } = useParams()

    useEffect(() => {
        getAllSkillCohortResources(id, [dateToday.format("YYYY-MM-DD HH:mm:ssZ")])
        if (userProfile.id) {
            getSkillCohortParticipant(id, userProfile.id)
        }
        // eslint-disable-next-line
    }, [userProfile])

    const todayResource = allSkillCohortResources.at(-1) || {}
    const previousResources = initial(allSkillCohortResources) || []

    const displayTodaysResource = !isEmpty(todayResource) && <ResourceCard skillCohortResource={todayResource} isPreviousResource={false} skillCohortParticipant={skillCohortParticipant}/>

    const displayPreviousResources = previousResources.map((resource) => {
        const diff = dateToday.diff(moment(resource.releaseDate).tz("America/Los_Angeles"), 'day')
        const isYesterday = diff === 1

        return <ResourceCard skillCohortResource={resource} key={resource.id} isPreviousResource={true} skillCohortParticipant={skillCohortParticipant} isYesterday={isYesterday}/>
    })
    return (
        <div className="skill-cohort-resources-page">
            <div className="skill-cohort-resources-page-container">
                <Row>
                    <Col span={24}>
                        <div className="container-header d-flex justify-between items-center">
                            <h3>Today's Resource</h3>
                        </div>
                    </Col>
                </Row>
                <div className="skill-cohort-resources-list">
                    {displayTodaysResource}
                </div>
                <Row>
                    <Col span={24}>
                        <div className="container-header d-flex justify-between items-center">
                            {!isEmpty(previousResources) && <h3>Previous Resources</h3>}
                        </div>
                    </Col>
                </Row>
                <div className="skill-cohort-resources-list previous-resource">
                    {displayPreviousResources}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => ({
    ...skillCohortResourceSelector(state),
    ...skillCohortParticipantSelector(state),
    userProfile: homeSelector(state).userProfile
})

const mapDispatchToProps = {
    ...skillCohortResourceActions,
    ...skillCohortParticipantActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillCohortResources)