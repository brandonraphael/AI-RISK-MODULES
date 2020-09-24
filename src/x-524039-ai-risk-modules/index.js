import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { createHttpEffect } from "@servicenow/ui-effect-http";
import "@servicenow/now-modal";
import "@servicenow/now-button";
import "@servicenow/now-loader";

const foundationalRiskTable = "x_524039_pericrora_ai_foundational_risk";
const businessUnitTable = "x_524039_pericrora_ai_business_unit";
const masterIssueTable = "x_524039_pericrora_ai_master_issue";

const fetchTablesEffect = ({ properties, dispatch }) => {
	dispatch("GET_FOUNDATIONAL_RISKS", {
		table: foundationalRiskTable,
	});
	dispatch("GET_BUSINESS_UNITS", {
		table: businessUnitTable
	});
	dispatch("GET_MASTER_ISSUES", {
		table: masterIssueTable,
	});
};

const createNewFoundationalRiskEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";

	dispatch("CREATE_NEW_FOUNDATIONAL_RISK",
		{
			table: foundationalRiskTable,
			requestData:
				{
					name: name,
					description: description
				}
		}
	);

	dispatch("MODAL_CLOSED");
};

const editFoundationalRiskEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";
	console.log(state.selectedFoundationalRisk.sys_id);

	dispatch("EDIT_FOUNDATIONAL_RISK",
		{
			table: foundationalRiskTable,
			sys_id: state.selectedFoundationalRisk.sys_id,
			requestData:
				{
					name: name,
					description: description
				}
		}
	);

	dispatch("MODAL_CLOSED");
}

const createNewBusinessUnitEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";

	dispatch("CREATE_NEW_BUSINESS_UNIT",
		{
			table: businessUnitTable,
			requestData:
				{
					name: name,
					description: description
				}
		}
	);

	dispatch("MODAL_CLOSED");
};

const createNewMasterIssueEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";

	dispatch("CREATE_NEW_MASTER_ISSUE",
		{
			table: masterIssueTable,
			requestData:
				{
					name: name,
					description: description
				}
		}
	);

	dispatch("MODAL_CLOSED");
};

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
							<li id="list_item">
								{result.name}
								<now-button id="view" on-click={() => updateState({ selectedFoundationalRisk: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Foundational Risks Found</li>
					)}
					<now-button id="create_new" on-click={() => updateState({ createNewFR: true })}>Create New FR</now-button>
					{state.createNewFR ? (
						<now-modal
							opened={state.createNewFR}
							size="lg"
							footerActions={[
								{
									label: "Cancel",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
								{
									label: "Create",
									variant: "primary",
									clickActionType: "CREATE_NEW_FOUNDATIONAL_RISK_METHOD",
								},
							]}
						>
							<h1>
								Create New Foundational Risk
							</h1>
							Risk Name:
							<input onchange={(e) => updateState({ name: e.target.value })}></input>
							<br/>
							Description
							<br/>
							<textarea onchange={(e) => updateState({ description: e.target.value })}></textarea>
							<br/>
							<span id="column">
								<u>
									Risk Level
								</u>
								<br/>
								5
								<br/>
								4
								<br/>
								3
								<br/>
								2
								<br/>
								1
							</span>
							<span id="column">
								<u>
									Description
								</u>
								<br/>
								<textarea></textarea>
								<br/>
								<textarea></textarea>
								<br/>
								<textarea></textarea>
								<br/>
								<textarea></textarea>
								<br/>
								<textarea></textarea>
							</span>
							<span id="column">
								<u>
									Min
								</u>
								<br/>
								<input></input>
								<br/>
								<input></input>
								<br/>
								<input></input>
								<br/>
								<input></input>
								<br/>
								<input></input>
							</span>
							<span id="column">
								<u>
									Max
								</u>
								<br/>
								<input></input>
								<br/>
								<input></input>
								<br/>
								<input></input>
								<br/>
								<input></input>
								<br/>
								<input></input>
							</span>
						</now-modal>
					) : null}

					{state.selectedFoundationalRisk ? (
						<now-modal
							opened={state.selectedFoundationalRisk}
							size="lg"
							footerActions={[
								{
									label: "Done",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
							]}
						>
							{state.editFR ? (
								<div>
									<h1>
										Editing: {state.selectedFoundationalRisk.name}
										<now-button id="edit" on-click={() => updateState({ editFR: !state.editFR })}>{state.editFR ? "Cancel" : "Edit"}</now-button>
									</h1>
									Foundational Risk
									<br/><br/>
									Name: <input value={state.selectedFoundationalRisk.name} onchange={(e) => updateState({ name: e.target.value })}></input>
									<br/><br/>
									Date Created: {state.selectedFoundationalRisk.sys_created_on}
									<br/><br/>
									Created By: {state.selectedFoundationalRisk.sys_created_by}
									<br/><br/>
									Description: <textarea value={state.selectedFoundationalRisk.description} onchange={(e) => updateState({ description: e.target.value })}></textarea>
									<br/><br/>
									<now-button on-click={() => dispatch("EDIT_FOUNDATIONAL_RISK_METHOD")}>Finish Editing</now-button>
								</div>
								) : (
								<div>
									<h1>
										{state.selectedFoundationalRisk.name}
										<now-button id="edit" on-click={() => updateState({ editFR: !state.editFR, name: state.selectedFoundationalRisk.name, description: state.selectedFoundationalRisk.description })}>Edit</now-button>
									</h1>
									Foundational Risk
									<br/><br/>
									Date Created: {state.selectedFoundationalRisk.sys_created_on}
									<br/><br/>
									Created By: {state.selectedFoundationalRisk.sys_created_by}
									<br/><br/>
									Description: {state.selectedFoundationalRisk.description}
								</div>
							) }
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
							<li id="list_item">
								{result.name}
								<now-button id="view" on-click={() => updateState({ selectedBusinessUnit: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Business Units Found</li>
					)}
					<now-button id="create_new" on-click={() => updateState({ createNewBU: true })}>Create New BU</now-button>
					{state.createNewBU ? (
						<now-modal
							opened={state.createNewBU}
							size="lg"
							footerActions={[
								{
									label: "Cancel",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
								{
									label: "Create",
									variant: "primary",
									clickActionType: "CREATE_NEW_BUSINESS_UNIT_METHOD",
								},
							]}
						>
							<h1>
								Create New Business Unit
							</h1>
							Business Unit Name:
							<input onchange={(e) => updateState({ name: e.target.value })}></input>
							<br/>
							Description
							<br/>
							<textarea onchange={(e) => updateState({ description: e.target.value })}></textarea>
							<br/>
						</now-modal>
					) : null}
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
							<h1>
								{state.selectedBusinessUnit.name}
								<now-button id="edit">Edit</now-button>
							</h1>
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
							<li id="list_item">
								{result.name}
								<now-button id="view" on-click={() => updateState({ selectedMasterIssue: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Master Issues Found</li>
					)}
					<now-button id="create_new" on-click={() => updateState({ createNewMI: true })}>Create New MI</now-button>
					{state.createNewMI ? (
						<now-modal
							opened={state.createNewMI}
							size="lg"
							footerActions={[
								{
									label: "Cancel",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
								{
									label: "Create",
									variant: "primary",
									clickActionType: "CREATE_NEW_MASTER_ISSUE_METHOD",
								},
							]}
						>
							<h1>
								Create New Master Issue
							</h1>
							Master Issue Name:
							<input onchange={(e) => updateState({ name: e.target.value })}></input>
							<br/>
							Description
							<br/>
							<textarea onchange={(e) => updateState({ description: e.target.value })}></textarea>
							<br/>
						</now-modal>
					) : null}
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
							<h1>
								{state.selectedMasterIssue.name}
								<now-button id="edit">Edit</now-button>
							</h1>
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
			<h1 id="admin_control_panel_title">
				Admin Control Panel
				<now-button id="create_ticket">
					Create Ticket
				</now-button>
			</h1>
			<div id="admin_control_panel">
				{businessUnits}
				<br/>
				{foundationalRisks}
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
		// actionType handlers
		[actionTypes.COMPONENT_CONNECTED]: fetchTablesEffect,

		// modal handlers
		"NOW_MODAL#OPENED_SET": ({ dispatch }) => {
			dispatch("MODAL_CLOSED")
		},
		MODAL_CLOSED: ({ updateState }) => {
			updateState({
				selectedBusinessUnit: null,
				selectedFoundationalRisk: null,
				selectedMasterIssue: null,
				createNewFR: false,
				createNewBU: false,
				createNewMI: false,
				editFR: false
			});
		},

		// common utility handlers
		'CREATE_NEW_SUCCESS': fetchTablesEffect,

		// business unit handlers
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
		'CREATE_NEW_BUSINESS_UNIT_METHOD': createNewBusinessUnitEffect,
		'CREATE_NEW_BUSINESS_UNIT': createHttpEffect("/api/now/table/:table",
			{
				pathParams: ["table"],
				method: 'POST',
				dataParam: 'requestData',
				successActionType: 'CREATE_NEW_SUCCESS'
			}
		),

		// master issue handlers
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
		'CREATE_NEW_MASTER_ISSUE_METHOD': createNewMasterIssueEffect,
		'CREATE_NEW_MASTER_ISSUE': createHttpEffect("/api/now/table/:table",
			{
				pathParams: ["table"],
				method: 'POST',
				dataParam: 'requestData',
				successActionType: 'CREATE_NEW_SUCCESS'
			}
		),

		// foundational risk handlers
		GET_FOUNDATIONAL_RISKS: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			startActionType: "GET_FOUNDATIONAL_RISKS_STARTED",
			successActionType: "GET_FOUNDATIONAL_RISKS_FETCHED",
		}),
		GET_FOUNDATIONAL_RISKS_STARTED: ({ updateState }) =>
			updateState({ showFoundationalRisksLoading: true, editFR: false }),
		GET_FOUNDATIONAL_RISKS_FETCHED: ({ action, updateState }) => {
			action.payload.result.map((result) => (
				console.log(result)
			))
			updateState({ foundationalRisks: action.payload.result, showFoundationalRisksLoading: false });
		},
		'CREATE_NEW_FOUNDATIONAL_RISK_METHOD': createNewFoundationalRiskEffect,
		'CREATE_NEW_FOUNDATIONAL_RISK': createHttpEffect("/api/now/table/:table",
			{
				pathParams: ["table"],
				method: 'POST',
				dataParam: 'requestData',
				successActionType: 'CREATE_NEW_SUCCESS'
			}
		),
		'EDIT_FOUNDATIONAL_RISK_METHOD': editFoundationalRiskEffect,
		'EDIT_FOUNDATIONAL_RISK': createHttpEffect("/api/now/table/:table/:sys_id",
			{
				pathParams: ["table", "sys_id"],
				method: 'PUT',
				dataParam: 'requestData',
				successActionType: 'CREATE_NEW_SUCCESS'
			}
		)
	},
	styles
});
