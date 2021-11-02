import { Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { INTERNAL_LINKS, EVENT_TYPES } from 'enum';
import moment from 'moment-timezone';
import { CustomButton, CustomModal } from 'components';
import Emitter from 'services/emitter';
import IconBack from 'images/icon-back.svg';
import { isEmpty } from 'lodash';

import { homeSelector } from 'redux/selectors/homeSelector';
import { skillCohortSelector } from 'redux/selectors/skillCohortSelector';
import { skillCohortParticipantSelector } from 'redux/selectors/skillCohortParticipantSelector';

import { actions as skillCohortActions } from 'redux/actions/skillCohort-actions';
import { actions as skillCohortParticipantActions } from 'redux/actions/skillCohortParticipant-actions';

import './style.scss';

const SkillCohortDetail = ({
	getSkillCohort,
	skillCohort,
	userProfile,
	createSkillCohortParticipant,
	getSkillCohortParticipant,
	skillCohortParticipant,
}) => {
	const [showFirewall, setShowFirewall] = useState(false);
	const [hasCohortStarted, setHasCohortStarted] = useState(false);
	const [confirmModal, setConfirmModal] = useState(false);
	const [isDayBeforeStartDate, setIsDayBeforeStartDate] = useState(false);

	const history = useHistory();
	const { id } = useParams();

	useEffect(() => {
		getSkillCohort(id);
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		if (!isEmpty(skillCohort)) {
			const { startDate } = skillCohort;
			const dateToday = moment().format('YYYY-MM-DD HH:mm:ssZ');

			if (
				dateToday ===
				moment(startDate)
					.startOf('day')
					.subtract(1, 'days')
					.format('YYYY-MM-DD HH:mm:ssZ')
			) {
				setHasCohortStarted(true);
				setIsDayBeforeStartDate(true);
			} else if (
				dateToday >= moment(startDate).format('YYYY-MM-DD HH:mm:ssZ')
			) {
				setHasCohortStarted(true);
			} else {
				setHasCohortStarted(false);
			}
		}

		// eslint-disable-next-line
	}, [skillCohort]);

	useEffect(() => {
		if (userProfile.id) {
			getSkillCohortParticipant(id, userProfile.id);
		}
		// eslint-disable-next-line
	}, [userProfile]);

	const planUpgrade = () => {
		Emitter.emit(EVENT_TYPES.OPEN_PAYMENT_MODAL);
	};

	const handleOnJoin = () => {
		if (userProfile && userProfile.memberShip === 'premium') {
			if (hasCohortStarted && skillCohortParticipant.hasAccess) {
				history.push(`${INTERNAL_LINKS.SKILL_COHORTS}/${id}/resources`);
			} else {
				setConfirmModal(true);
			}
		} else {
			setShowFirewall(true);
		}
	};

	const displayFirewall = showFirewall && (
		<div
			className="skill-cohort-firewall"
			onClick={() => setShowFirewall(false)}
		>
			<div className="upgrade-notification-panel" onClick={planUpgrade}>
				<h3>
					Upgrade to a PREMIUM Membership and get unlimited access to
					the LAB features
				</h3>
			</div>
		</div>
	);

	let displayBtn;

	if (!isEmpty(skillCohort)) {
		if (hasCohortStarted) {
			if (skillCohortParticipant.hasAccess) {
				if (isDayBeforeStartDate) {
					displayBtn = `Starting on ${moment(
						skillCohort.startDate,
					).format('LL')}`;
				} else {
					displayBtn = 'Enter Dashboard';
				}
			} else {
				if (!isEmpty(skillCohortParticipant)) {
					displayBtn = 'You missed this cohort';
				} else {
					displayBtn = 'Cohort has started.';
				}
			}
		} else {
			if (skillCohortParticipant.hasAccess) {
				displayBtn = `Starting on ${moment(
					skillCohort.startDate,
				).format('LL')}`;
			} else {
				displayBtn = 'Join';
			}
		}
	} else {
		displayBtn = '';
	}

	const handleJoinSkillCohort = () => {
		setConfirmModal(false);
		createSkillCohortParticipant(skillCohort.id, userProfile.id);
	};

	const disabled =
		(hasCohortStarted && !skillCohortParticipant.hasAccess) ||
		(!hasCohortStarted && skillCohortParticipant.hasAccess);

	return (
		<>
			<div className="skill-cohort-detail-page">
				<div className="skill-cohort-detail-page-header">
					<div className="skill-cohort-detail-page-header-content">
						<div>
							<div
								className="skill-cohort-detail-page-header-content-back-btn"
								onClick={() =>
									history.push(INTERNAL_LINKS.SKILL_COHORTS)
								}
							>
								<div className="skill-cohort-detail-page-header-content-back">
									<div className="skill-cohort-detail-page-header-content-back-img">
										<img src={IconBack} alt="icon-back" />
									</div>
									<h4>Back to List</h4>
								</div>
							</div>
							<div className="skill-cohort-detail-page-header-content-title">
								<h2>{skillCohort.title}</h2>
							</div>
							<div className="skill-cohort-detail-page-header-content-skill-cohort-btn">
								<CustomButton
									text={displayBtn}
									htmlType="button"
									onClick={handleOnJoin}
									disabled={disabled || isDayBeforeStartDate}
								/>
							</div>
						</div>
					</div>
				</div>
				<div className="skill-cohort-detail-page-body">
					<div className="skill-cohort-detail-page-body-content">
						<Space direction="vertical" size="large">
							<Space direction='vertical'>
								<h3>Description</h3>
								<div className="details">{skillCohort.description}</div>
							</Space>
							<Space direction='vertical'>
								<h3>Learning Objectives</h3>
								<div className="details">{skillCohort.objectives}</div>
							</Space>
							<Space direction='vertical'>
								<h3>Schedule</h3>
								<div className="details">Starting on {moment(skillCohort.startDate).format('LL')}</div>
								<div className="details">Finishing on on {moment(skillCohort.endDate).format('LL')}</div>
							</Space>
						</Space>
					</div>
				</div>
        {displayFirewall}
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

export default connect(mapStateToProps, mapDispatchToProps)(SkillCohortDetail);
