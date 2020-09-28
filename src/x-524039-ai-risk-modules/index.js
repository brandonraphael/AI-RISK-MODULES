import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { createHttpEffect } from "@servicenow/ui-effect-http";
import "@servicenow/now-modal";
import "@servicenow/now-button";
import "@servicenow/now-loader";
import "@servicenow/now-dropdown";

const foundationalRiskTable = "x_524039_pericrora_ai_foundational_risk";
const businessUnitTable = "x_524039_pericrora_ai_business_unit";
const controlTable = "x_524039_pericrora_ai_risk_control";
const projectTable = "x_524039_pericrora_risk_project_ticket";

const fetchTablesEffect = ({ properties, dispatch }) => {
	dispatch("GET_FOUNDATIONAL_RISKS", {
		table: foundationalRiskTable,
	});
	dispatch("GET_BUSINESS_UNITS", {
		table: businessUnitTable
	});
};

const getControlEffect = ({ dispatch }) => {
	action.payload.result.map((result) => (
		result.controls.split(",").map((control) => {
			if (control !== null && control !== "") {
				console.log(result)
				result.controls = "whate"
				console.log(result)

			}
		})
	))

	dispatch("GET_CONTROL", {
		table: controlTable,
		sys_id: sys_id,
	});
}

const createNewFoundationalRiskEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";

	let descriptions = state.risk_level_5_description ? state.risk_level_5_description : "";
	descriptions = state.risk_level_4_description ? descriptions + "," + state.risk_level_4_description : descriptions;
	descriptions = state.risk_level_3_description ? descriptions + "," + state.risk_level_3_description : descriptions;
	descriptions = state.risk_level_2_description ? descriptions + "," + state.risk_level_2_description : descriptions;
	descriptions = state.risk_level_1_description ? descriptions + "," + state.risk_level_1_description : descriptions;

	let mins = state.risk_level_5_min ? state.risk_level_5_min : "";
	mins = state.risk_level_4_min ? mins + "," + state.risk_level_4_min : mins;
	mins = state.risk_level_3_min ? mins + "," + state.risk_level_3_min : mins;
	mins = state.risk_level_2_min ? mins + "," + state.risk_level_2_min : mins;
	mins = state.risk_level_1_min ? mins + "," + state.risk_level_1_min : mins;

	let max = state.risk_level_5_max ? state.risk_level_5_max : "";
	max = state.risk_level_4_max ? max + "," + state.risk_level_4_max : max;
	max = state.risk_level_3_max ? max + "," + state.risk_level_3_max : max;
	max = state.risk_level_2_max ? max + "," + state.risk_level_2_max : max;
	max = state.risk_level_1_max ? max + "," + state.risk_level_1_max : max;

	dispatch("CREATE",
		{
			table: foundationalRiskTable,
			requestData:
				{
					name: name,
					description: description,
					risk_level_descriptions: descriptions,
					risk_level_mins: mins,
					risk_level_max: max
				}
		}
	);

	dispatch("MODAL_CLOSED");
};

const editFoundationalRiskEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";

	let descriptions = state.risk_level_5_description ? state.risk_level_5_description : (state.selectedFoundationalRisk.risk_level_descriptions.split(",")[0] ? state.selectedFoundationalRisk.risk_level_descriptions.split(",")[0] : "");
	descriptions = state.risk_level_4_description ? descriptions + "," + state.risk_level_4_description : (state.selectedFoundationalRisk.risk_level_descriptions.split(",")[1] ? (descriptions + "," + state.selectedFoundationalRisk.risk_level_descriptions.split(",")[1]) : descriptions + "," + "");
	descriptions = state.risk_level_3_description ? descriptions + "," + state.risk_level_3_description : (state.selectedFoundationalRisk.risk_level_descriptions.split(",")[2] ? (descriptions + "," + state.selectedFoundationalRisk.risk_level_descriptions.split(",")[2]) : descriptions + "," + "");
	descriptions = state.risk_level_2_description ? descriptions + "," + state.risk_level_2_description : (state.selectedFoundationalRisk.risk_level_descriptions.split(",")[3] ? (descriptions + "," + state.selectedFoundationalRisk.risk_level_descriptions.split(",")[3]) : descriptions + "," + "");
	descriptions = state.risk_level_1_description ? descriptions + "," + state.risk_level_1_description : (state.selectedFoundationalRisk.risk_level_descriptions.split(",")[4] ? (descriptions + "," + state.selectedFoundationalRisk.risk_level_descriptions.split(",")[4]) : descriptions + "," + "");

	let mins = state.risk_level_5_min ? state.risk_level_5_min : (state.selectedFoundationalRisk.risk_level_mins.split(",")[0] ? state.selectedFoundationalRisk.risk_level_mins.split(",")[0] : "");
	mins = state.risk_level_4_min ? mins + "," + state.risk_level_4_min : (state.selectedFoundationalRisk.risk_level_mins.split(",")[1] ? (mins + "," + state.selectedFoundationalRisk.risk_level_mins.split(",")[1]) : mins + "," + "");
	mins = state.risk_level_3_min ? mins + "," + state.risk_level_3_min : (state.selectedFoundationalRisk.risk_level_mins.split(",")[2] ? (mins + "," + state.selectedFoundationalRisk.risk_level_mins.split(",")[2]) : mins + "," + "");
	mins = state.risk_level_2_min ? mins + "," + state.risk_level_2_min : (state.selectedFoundationalRisk.risk_level_mins.split(",")[3] ? (mins + "," + state.selectedFoundationalRisk.risk_level_mins.split(",")[3]) : mins + "," + "");
	mins = state.risk_level_1_min ? mins + "," + state.risk_level_1_min : (state.selectedFoundationalRisk.risk_level_mins.split(",")[4] ? (mins + "," + state.selectedFoundationalRisk.risk_level_mins.split(",")[4]) : mins + "," + "");

	let max = state.risk_level_5_max ? state.risk_level_5_max : (state.selectedFoundationalRisk.risk_level_max.split(",")[0] ? state.selectedFoundationalRisk.risk_level_max.split(",")[0] : "");
	max = state.risk_level_4_max ? max + "," + state.risk_level_4_max : (state.selectedFoundationalRisk.risk_level_max.split(",")[1] ? (max + "," + state.selectedFoundationalRisk.risk_level_max.split(",")[1]) : max + "," + "");
	max = state.risk_level_3_max ? max + "," + state.risk_level_3_max : (state.selectedFoundationalRisk.risk_level_max.split(",")[2] ? (max + "," + state.selectedFoundationalRisk.risk_level_max.split(",")[2]) : max + "," + "");
	max = state.risk_level_2_max ? max + "," + state.risk_level_2_max : (state.selectedFoundationalRisk.risk_level_max.split(",")[3] ? (max + "," + state.selectedFoundationalRisk.risk_level_max.split(",")[3]) : max + "," + "");
	max = state.risk_level_1_max ? max + "," + state.risk_level_1_max : (state.selectedFoundationalRisk.risk_level_max.split(",")[4] ? (max + "," + state.selectedFoundationalRisk.risk_level_max.split(",")[4]) : max + "," + "");


	dispatch("EDIT",
		{
			table: foundationalRiskTable,
			sys_id: state.selectedFoundationalRisk.sys_id,
			requestData:
				{
					name: name,
					description: description,
					risk_level_descriptions: descriptions,
					risk_level_mins: mins,
					risk_level_max: max
				}
		}
	);

	dispatch("MODAL_CLOSED");
}

const createNewBusinessUnitEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";
	let goal = state.goal ? state.goal : "";

	dispatch("CREATE",
		{
			table: businessUnitTable,
			requestData:
				{
					name: name,
					goal: goal,
					description: description
				}
		}
	);

	dispatch("MODAL_CLOSED");
};

const editBusinessUnitEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";
	let goal = state.goal ? state.goal : "";

	dispatch("EDIT",
		{
			table: businessUnitTable,
			sys_id: state.selectedBusinessUnit.sys_id,
			requestData:
				{
					name: name,
					goal: goal,
					description: description,
				}
		}
	);

	dispatch("MODAL_CLOSED");
}

const getBusinessUnitEffect = ({ state, dispatch }) => {
	dispatch("GET",
		{
			table: businessUnitTable,
			sys_id: state.sys_id
		}
	);
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
								<textarea onchange={(e) => updateState({ risk_level_5_description: e.target.value })}></textarea>
								<br/>
								<textarea onchange={(e) => updateState({ risk_level_4_description: e.target.value })}></textarea>
								<br/>
								<textarea onchange={(e) => updateState({ risk_level_3_description: e.target.value })}></textarea>
								<br/>
								<textarea onchange={(e) => updateState({ risk_level_2_description: e.target.value })}></textarea>
								<br/>
								<textarea onchange={(e) => updateState({ risk_level_1_description: e.target.value })}></textarea>
							</span>
							<span id="column">
								<u>
									Min
								</u>
								<br/>
								<input onchange={(e) => updateState({ risk_level_5_min: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_4_min: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_3_min: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_2_min: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_1_min: e.target.value })}></input>
							</span>
							<span id="column">
								<u>
									Max
								</u>
								<br/>
								<input onchange={(e) => updateState({ risk_level_5_max: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_4_max: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_3_max: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_2_max: e.target.value })}></input>
								<br/>
								<input onchange={(e) => updateState({ risk_level_1_max: e.target.value })}></input>
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
										<textarea value={state.selectedFoundationalRisk.risk_level_descriptions.split(",")[0]} onchange={(e) => updateState({ risk_level_5_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedFoundationalRisk.risk_level_descriptions.split(",")[1]} onchange={(e) => updateState({ risk_level_4_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedFoundationalRisk.risk_level_descriptions.split(",")[2]} onchange={(e) => updateState({ risk_level_3_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedFoundationalRisk.risk_level_descriptions.split(",")[3]} onchange={(e) => updateState({ risk_level_2_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedFoundationalRisk.risk_level_descriptions.split(",")[4]} onchange={(e) => updateState({ risk_level_1_description: e.target.value })}></textarea>
									</span>
									<span id="column">
										<u>
											Min
										</u>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_mins.split(",")[0]} onchange={(e) => updateState({ risk_level_5_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_mins.split(",")[1]} onchange={(e) => updateState({ risk_level_4_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_mins.split(",")[2]} onchange={(e) => updateState({ risk_level_3_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_mins.split(",")[3]} onchange={(e) => updateState({ risk_level_2_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_mins.split(",")[4]} onchange={(e) => updateState({ risk_level_1_min: e.target.value })}></input>
									</span>
									<span id="column">
										<u>
											Max
										</u>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_max.split(",")[0]} onchange={(e) => updateState({ risk_level_5_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_max.split(",")[1]} onchange={(e) => updateState({ risk_level_4_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_max.split(",")[2]} onchange={(e) => updateState({ risk_level_3_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_max.split(",")[3]} onchange={(e) => updateState({ risk_level_2_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedFoundationalRisk.risk_level_max.split(",")[4]} onchange={(e) => updateState({ risk_level_1_max: e.target.value })}></input>
									</span>
									<br/><br/>
									<div>
										<now-button on-click={() => dispatch("EDIT_FOUNDATIONAL_RISK_METHOD")}>Finish Editing</now-button>
									</div>
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
									<br/><br/>
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
										{state.selectedFoundationalRisk.risk_level_descriptions.split(",")[0]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_descriptions.split(",")[1]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_descriptions.split(",")[2]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_descriptions.split(",")[3]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_descriptions.split(",")[4]}
									</span>
									<span id="column">
										<u>
											Min
										</u>
										<br/>
										{state.selectedFoundationalRisk.risk_level_mins.split(",")[0]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_mins.split(",")[1]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_mins.split(",")[2]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_mins.split(",")[3]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_mins.split(",")[4]}
									</span>
									<span id="column">
										<u>
											Max
										</u>
										<br/>
										{state.selectedFoundationalRisk.risk_level_max.split(",")[0]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_max.split(",")[1]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_max.split(",")[2]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_max.split(",")[3]}
										<br/>
										{state.selectedFoundationalRisk.risk_level_max.split(",")[4]}
									</span>
								</div>
							) }
						</now-modal>
					) : null}
				</ul>
			</div>
	}

	let businessUnits;
	if (state.showBusinessUnitsLoading) {
		businessUnits = <div></div>
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
							<br/><br/>
							Goal:
							<textarea onchange={(e) => updateState({ goal: e.target.value })}></textarea>
							<br/><br/>
							Description
							<br/><br/>
							<textarea onchange={(e) => updateState({ description: e.target.value })}></textarea>
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
							{state.editBU ? (
								<div>
									<h1>
										Editing: {state.selectedBusinessUnit.name}
										<now-button id="edit" on-click={() => updateState({ editBU: !state.editBU })}>{state.editBU ? "Cancel" : "Edit"}</now-button>
									</h1>
									Business Unit
									<br/><br/>
									Name: <input value={state.selectedBusinessUnit.name} onchange={(e) => updateState({ name: e.target.value })}></input>
									<br/><br/>
									Date Created: {state.selectedBusinessUnit.sys_created_on}
									<br/><br/>
									Created By: {state.selectedBusinessUnit.sys_created_by}
									<br/><br/>
									Goal:
									<textarea value={state.selectedBusinessUnit.goal} onchange={(e) => updateState({ goal: e.target.value })}></textarea>
									<br/><br/>
									Description: <textarea value={state.selectedBusinessUnit.description} onchange={(e) => updateState({ description: e.target.value })}></textarea>
									<br/><br/>
									Linked Project(s):
									<ul>
										{state.selectedBusinessUnit.projects.length ? (
											state.selectedBusinessUnit.projects.split(',').map((result) => (
												<li>
													{state.fetched_projects[result].number}
												</li>
											))
										) : (
											<p>NONE</p>
										)}
									</ul>
									<br/><br/>
									Linked Control(s):
									<ul>
										{state.selectedBusinessUnit.controls.length ? (
											state.selectedBusinessUnit.controls.split(',').map((result) => (
												<li>
													{state.fetched_controls[result].name}
												</li>
											))
										) : (
											<p>NONE</p>
										)}
									</ul>
									<br/><br/>
									<now-button on-click={() => dispatch("EDIT_BUSINESS_UNIT_METHOD")}>Finish Editing</now-button>
								</div>
							) : (
								<div>
									<h1>
										{state.selectedBusinessUnit.name}
										<now-button id="edit" on-click={() => updateState({ editBU: !state.editBU, name: state.selectedBusinessUnit.name, description: state.selectedBusinessUnit.description })}>Edit</now-button>
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
									<br/><br/>
									Linked Project(s):
									<ul>
										{state.selectedBusinessUnit.projects.length ? (
											state.selectedBusinessUnit.projects.split(',').map((result) => (
												<li>
													{state.fetched_projects[result].number}
												</li>
											))
										) : (
											<p>NONE</p>
										)}
									</ul>
									<br/><br/>
									Linked Control(s):
									<ul>
										{state.selectedBusinessUnit.controls.length ? (
											state.selectedBusinessUnit.controls.split(',').map((result) => (
												<li>
													{state.fetched_controls[result].name}
												</li>
											))
										) : (
											<p>NONE</p>
										)}
									</ul>
								</div>
							) }
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

		// dropdown handlers
		"NOW_DROPDOWN#ITEM_CLICKED": ({ action, updateState }) => {
			updateState({ priority: action.payload.item.value });
		},

		// modal handlers
		"NOW_MODAL#OPENED_SET": ({ dispatch }) => {
			dispatch("MODAL_CLOSED")
		},
		MODAL_CLOSED: ({ updateState }) => {
			updateState({
				selectedBusinessUnit: null,
				selectedFoundationalRisk: null,
				createNewFR: false,
				createNewBU: false,
				editFR: false,
				editBU: false,

				risk_level_5_description: null,
				risk_level_4_description: null,
				risk_level_3_description: null,
				risk_level_2_description: null,
				risk_level_1_description: null,

				risk_level_5_min: null,
				risk_level_4_min: null,
				risk_level_3_min: null,
				risk_level_2_min: null,
				risk_level_1_min: null,

				risk_level_5_max: null,
				risk_level_4_max: null,
				risk_level_3_max: null,
				risk_level_2_max: null,
				risk_level_1_max: null,

				name: null,
				description: null,

				goal: null,
				sys_id: null,
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
			updateState({ showBusinessUnitsLoading: true, editBU: false  }),
		GET_BUSINESS_UNITS_FETCHED: ({ action, updateState, dispatch }) => {
			updateState({ businessUnits: action.payload.result, showBusinessUnitsLoading: false, fetched_controls: {}, fetched_projects: {} })
			action.payload.result.map((bu) => (
				bu.controls.split(",").map((control, index) => {
					if (control !== null && control !== "") {
						dispatch("GET_CONTROL", {
							table: controlTable,
							sys_id: control,
						});
					}
				})
			))
			console.log(action.payload.result)
			action.payload.result.map((bu) => (
				bu.projects.split(",").map((project, index) => {
					if (project !== null && project !== "") {
						dispatch("GET_PROJECT", {
							table: projectTable,
							sys_id: project,
						});
					}
				})
			))
			updateState({ fetched_controls: {} })
		},
		GET_CONTROL: createHttpEffect("/api/now/table/:table/:sys_id", {
			pathParams: ["table", "sys_id"],
			successActionType: "GET_CONTROL_FETCHED",
		}),
		GET_CONTROL_FETCHED: ({state, action}) => {
			console.log(state)
			state.fetched_controls[action.payload.result.sys_id] = action.payload.result
		},
		GET_PROJECT: createHttpEffect("/api/now/table/:table/:sys_id", {
			pathParams: ["table", "sys_id"],
			successActionType: "GET_PROJECT_FETCHED",
		}),
		GET_PROJECT_FETCHED: ({state, action}) => {
			state.fetched_projects[action.payload.result.sys_id] = action.payload.result
		},
		'CREATE_NEW_BUSINESS_UNIT_METHOD': createNewBusinessUnitEffect,

		// foundational risk handlers
		GET_FOUNDATIONAL_RISKS: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			startActionType: "GET_FOUNDATIONAL_RISKS_STARTED",
			successActionType: "GET_FOUNDATIONAL_RISKS_FETCHED",
		}),
		GET_FOUNDATIONAL_RISKS_STARTED: ({ updateState }) =>
			updateState({ showFoundationalRisksLoading: true, editFR: false }),
		GET_FOUNDATIONAL_RISKS_FETCHED: ({ action, updateState }) => {
			// action.payload.result.map((result) => (
			// 	console.log(result)
			// ))
			updateState({ foundationalRisks: action.payload.result, showFoundationalRisksLoading: false });
		},
		'CREATE_NEW_FOUNDATIONAL_RISK_METHOD': createNewFoundationalRiskEffect,
		'EDIT_FOUNDATIONAL_RISK_METHOD': editFoundationalRiskEffect,
		'EDIT_BUSINESS_UNIT_METHOD': editBusinessUnitEffect,
		'GET_BUSINESS_UNIT': getBusinessUnitEffect,
		'CREATE': createHttpEffect("/api/now/table/:table",
			{
				pathParams: ["table"],
				method: 'POST',
				dataParam: 'requestData',
				successActionType: 'CREATE_NEW_SUCCESS'
			}
		),
		'EDIT': createHttpEffect("/api/now/table/:table/:sys_id",
			{
				pathParams: ["table", "sys_id"],
				method: 'PUT',
				dataParam: 'requestData',
				successActionType: 'CREATE_NEW_SUCCESS'
			}
		),
		'GET': createHttpEffect("/api/now/table/:table/:sys_id",
			{
				pathParams: ["table", "sys_id"],
				method: 'GET',
				successActionType: 'GET_SUCCESS'
			}
		)
	},
	styles
});
