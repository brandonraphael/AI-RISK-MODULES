import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { createHttpEffect } from "@servicenow/ui-effect-http";
import "@servicenow/now-modal";
import "@servicenow/now-button";
import "@servicenow/now-loader";

const fetchBusinessUnitsEffect = ({}) => {
	console.log("yoyoyoyo");
}

const fetchTablesEffect = ({ properties, dispatch }) => {
	dispatch("GET_FOUNDATIONAL_RISKS", {
		table: "x_524039_pericrora_ai_foundational_risk",
		// sysparm_query: `short_descriptionLIKE${properties.searchText}`,
	});
	dispatch("GET_BUSINESS_UNITS", {
		table: "x_524039_pericrora_ai_business_unit",
	});
	dispatch("GET_MASTER_ISSUES", {
		table: "x_524039_pericrora_ai_master_issue",
	});
};

const handleFetchSucceeded = ({action, updateState}) => {
	console.log("Fetch succeeded!");
}

const handleFetchFailed = ({action}) => {
	console.log("Fetch failed!");
}

const handleFetchStarted = ({action}) => {
	console.log("Started fetch of table...");
}

const view = (state, { dispatch, updateState }) => {
	let foundationalRisks;
	if (state.showFoundationalRisksLoading) {
		foundationalRisks = <now-loader id="loader"></now-loader>
	} else {
		foundationalRisks =
			<div>
				<h2 id="title">
					<u>
						Foundational Risks
					</u>
				</h2>
				<ul id="list">
					{state.foundationalRisks.length ? (
						state.foundationalRisks.map((result) => (
							<li id={"list_item"}>
								{result.name}
								<now-button id="view" on-click={() => updateState({ selectedResult: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Foundational Risks Found</li>
					)}
					<now-button id="create_new" >Create New FR</now-button>
					{state.selectedResult ? (
						<now-modal
							opened={state.selectedResult}
							size="lg"
							footerActions={[
								{
									label: "Done",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
							]}
						>
							<h1>{state.selectedResult.name}</h1>
							Foundational Risk
							<br/><br/>
							Date Created: {state.selectedResult.sys_created_on}
							<br/><br/>
							Created By: {state.selectedResult.sys_created_by}
							<br/><br/>
							Description: {state.selectedResult.description}
						</now-modal>
					) : null}
				</ul>
			</div>
	}

	let businessUnits;
	if (state.showBusinessUnitsLoading) {
		businessUnits = <now-loader id="loader"></now-loader>
	} else {
		businessUnits =
			<div>
				<h2 id="title">
					<u>
						Business Units
					</u>
				</h2>
				<ul id="list">
					{state.businessUnits.length ? (
						state.businessUnits.map((result) => (
							<li id={"list_item"}>
								{result.name}
								<now-button id="view" on-click={() => updateState({ selectedBusinessUnit: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Business Units Found</li>
					)}
					<now-button id="create_new" >Create New BU</now-button>
					{state.selectedBusinessUnit ? (
						<now-modal
							opened={state.selectedBusinessUnit}
							size="lg"
							footerActions={[
								{
									label: "Done",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
							]}

						>
							<h1>{state.selectedBusinessUnit.name}</h1>
							Business Unit
							<br/><br/>
							Date Created: {state.selectedBusinessUnit.sys_created_on}
							<br/><br/>
							Created By: {state.selectedBusinessUnit.sys_created_by}
							<br/><br/>
							Goal: {state.selectedBusinessUnit.goal}
							<br/><br/>
							Description: {state.selectedBusinessUnit.description}
						</now-modal>
					) : null}
				</ul>
			</div>
	}

	let masterIssues;
	if (state.showMasterIssuesLoading) {
		masterIssues = <now-loader id="loader"></now-loader>
	} else {
		masterIssues =
			<div>
				<h2 id="title">
					<u>
						Master Issues
					</u>
				</h2>
				<ul id="list">
					{state.masterIssues.length ? (
						state.masterIssues.map((result) => (
							<li id={"list_item"}>
								{result.name}
								<now-button id="view" on-click={() => updateState({ selectedMasterIssue: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Master Issues Found</li>
					)}
					<now-button id="create_new" >Create New MI</now-button>
					{state.selectedMasterIssue ? (
						<now-modal
							opened={state.selectedMasterIssue}
							size="lg"
							footerActions={[
								{
									label: "Done",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
							]}

						>
							<h1>{state.selectedMasterIssue.name}</h1>
							Master Issue
							<br/><br/>
							Date Created: {state.selectedMasterIssue.sys_created_on}
							<br/><br/>
							Created By: {state.selectedMasterIssue.sys_created_by}
							<br/><br/>
							Description: {state.selectedMasterIssue.description}
						</now-modal>
					) : null}
				</ul>
			</div>
	}

	return (
		<div>
			<h1 id={"admin_control_panel_title"}>
				Admin Control Panel
				<now-button id="create_ticket">
					Create Ticket
				</now-button>
			</h1>
			<div id="admin_control_panel">
				{foundationalRisks}
				<br/>
				{businessUnits}
				<br/>
				{masterIssues}
			</div>
		</div>
	);
	// return <button on-click={buttonClicked}>Click me!</button>
};

createCustomElement('x-524039-ai-risk-modules', {
	renderer: {type: snabbdom},
	view,
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: fetchTablesEffect,
		GET_FOUNDATIONAL_RISKS: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			startActionType: "GET_FOUNDATIONAL_RISKS_STARTED",
			successActionType: "GET_FOUNDATIONAL_RISKS_FETCHED",
		}),
		GET_FOUNDATIONAL_RISKS_STARTED: ({ updateState }) =>
			updateState({ showFoundationalRisksLoading: true }),
		GET_FOUNDATIONAL_RISKS_FETCHED: ({ action, updateState }) => {
			action.payload.result.map((result) => (
				console.log(result)
			))
			updateState({ foundationalRisks: action.payload.result, showFoundationalRisksLoading: false });
		},
		GET_BUSINESS_UNITS: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			startActionType: "GET_BUSINESS_UNITS_STARTED",
			successActionType: "GET_BUSINESS_UNITS_FETCHED",
		}),
		GET_BUSINESS_UNITS_STARTED: ({ updateState }) =>
			updateState({ showBusinessUnitsLoading: true }),
		GET_BUSINESS_UNITS_FETCHED: ({ action, updateState }) => {
			action.payload.result.map((result) => (
				console.log(result)
			))
			updateState({ businessUnits: action.payload.result, showBusinessUnitsLoading: false });
		},
		GET_MASTER_ISSUES: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			startActionType: "GET_MASTER_ISSUES_STARTED",
			successActionType: "GET_MASTER_ISSUES_FETCHED",
		}),
		GET_MASTER_ISSUES_STARTED: ({ updateState }) =>
			updateState({ showMasterIssuesLoading: true }),
		GET_MASTER_ISSUES_FETCHED: ({ action, updateState }) => {
			action.payload.result.map((result) => (
				console.log(result)
			))
			updateState({ masterIssues: action.payload.result, showMasterIssuesLoading: false });
		},
		'FETCH_SUCCEEDED': handleFetchSucceeded,
		'FETCH_FAILED': handleFetchFailed,
		'FETCH_STARTED': handleFetchStarted,
	},
	styles
});
