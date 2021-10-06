import { Row, Col } from "antd";
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { skillCohortSelector } from 'redux/selectors/skillCohortSelector'
import { actions as skillCohortActions } from 'redux/actions/skillCohort-actions'
import { numberWithCommas } from "utils/format";

import SkillCohortFilterDrawer from './SkillCohortFilterDrawer'
import SkillCohortCard from './SkillCohortCard'

import './style.scss'

const SkillCohort = ({ allSkillCohorts, getAllSkillCohorts }) => {

    useEffect(() => {
        getAllSkillCohorts([])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFilterChange = filter => {
        getAllSkillCohorts(filter.category)
    }

    const displaySkillCohorts = allSkillCohorts.map((skillCohort) => {
        return <SkillCohortCard key={skillCohort.id} skillCohort={skillCohort} />
    })

    return (
        <div className="skill-cohort-page">
            <SkillCohortFilterDrawer onChange={handleFilterChange} />
            <div className="skill-cohort-page-container">
                <div className="search-results-container">
                    <Row>
                        <Col span={24}>
                        <div className="search-results-container-header d-flex justify-between items-center">
                            <h3>{`${numberWithCommas(allSkillCohorts.length)} result${
                            allSkillCohorts.length > 1 ? "s" : ""
                            }`}</h3>
                        </div>
                        </Col>
                    </Row>
                    <div className="skill-cohort-list">
                        {displaySkillCohorts}
                    </div>
                </div>
            </div>
        </div>
  );
}

const mapStateToProps = (state) => ({
    ...skillCohortSelector(state)
})

const mapDispatchToProps = {
    ...skillCohortActions
}

export default connect(mapStateToProps, mapDispatchToProps)(SkillCohort)