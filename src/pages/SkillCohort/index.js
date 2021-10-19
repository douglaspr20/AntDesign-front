import { Row, Col } from 'antd';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { numberWithCommas } from 'utils/format';
import moment from 'moment-timezone';

import { homeSelector } from 'redux/selectors/homeSelector';
import { skillCohortSelector } from 'redux/selectors/skillCohortSelector';
import { skillCohortParticipantSelector } from 'redux/selectors/skillCohortParticipantSelector';

import { actions as skillCohortActions } from 'redux/actions/skillCohort-actions';
import { actions as skillCohortParticipantActions } from 'redux/actions/skillCohortParticipant-actions';

import SkillCohortFilterDrawer from './SkillCohortFilterDrawer';
import SkillCohortCard from './SkillCohortCard';

import './style.scss';

moment().tz('America/Los_Angeles').format();

const SkillCohort = ({
	allSkillCohorts,
	getAllSkillCohorts,
	userProfile,
	getAllSkillCohortParticipants,
	allSkillCohortParticipants,
}) => {
	useEffect(() => {
		getAllSkillCohorts([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (userProfile.id) {
			getAllSkillCohortParticipants(userProfile.id);
		}
		// eslint-disable-next-line
	}, [userProfile]);

	const handleFilterChange = (filter) => {
		getAllSkillCohorts(filter.category);
	};

	const displaySkillCohorts = allSkillCohorts.map((skillCohort) => {
		const hasAccess = allSkillCohortParticipants.some((participant) => {
			return participant.SkillCohortId === skillCohort.id;
		});

		return <SkillCohortCard key={skillCohort.id} skillCohort={skillCohort} hasAccess={hasAccess} />;
	});

	return (
		<div className="skill-cohort-page">
			<SkillCohortFilterDrawer onChange={handleFilterChange} />
			<div className="skill-cohort-page-container">
				<div className="search-results-container">
					<Row>
						<Col span={24}>
							<div className="search-results-container-header d-flex justify-between items-center">
								<h3>{`${numberWithCommas(allSkillCohorts.length)} result${
									allSkillCohorts.length > 1 ? 's' : ''
								}`}</h3>
							</div>
						</Col>
					</Row>
					<div className="skill-cohort-list">{displaySkillCohorts}</div>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...skillCohortSelector(state),
	...skillCohortParticipantSelector(state),
	userProfile: homeSelector(state).userProfile,
});

const mapDispatchToProps = {
	...skillCohortActions,
	...skillCohortParticipantActions,
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillCohort);
