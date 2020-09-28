import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { createHttpEffect } from "@servicenow/ui-effect-http";
import "@servicenow/now-modal";
import "@servicenow/now-button";
import "@servicenow/now-loader";
import "@servicenow/now-dropdown";

const riskLeverTable = "x_524039_pericrora_ai_risk_lever";
const businessUnitTable = "x_524039_pericrora_ai_business_unit";
const controlTable = "x_524039_pericrora_ai_risk_control";
const projectTable = "x_524039_pericrora_risk_project_ticket";

const fetchTablesEffect = ({ properties, dispatch }) => {
	dispatch("GET_RISK_LEVERS", {
		table: riskLeverTable,
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

const createNewRiskLeverEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";

	let description_5 = state.risk_level_5_description ? state.risk_level_5_description : "";
	let description_4 = state.risk_level_4_description ? state.risk_level_4_description : "";
	let description_3 = state.risk_level_3_description ? state.risk_level_3_description : "";
	let description_2 = state.risk_level_2_description ? state.risk_level_2_description : "";
	let description_1 = state.risk_level_1_description ? state.risk_level_1_description : "";

	let min_5 = state.risk_level_5_min ? state.risk_level_5_min : "";
	let min_4 = state.risk_level_4_min ? state.risk_level_4_min : "";
	let min_3 = state.risk_level_3_min ? state.risk_level_3_min : "";
	let min_2 = state.risk_level_2_min ? state.risk_level_2_min : "";
	let min_1 = state.risk_level_1_min ? state.risk_level_1_min : "";

	let max_5 = state.risk_level_5_max ? state.risk_level_5_max : "";
	let max_4 = state.risk_level_4_max ? state.risk_level_4_max : "";
	let max_3 = state.risk_level_3_max ? state.risk_level_3_max : "";
	let max_2 = state.risk_level_2_max ? state.risk_level_2_max : "";
	let max_1 = state.risk_level_1_max ? state.risk_level_1_max : "";

	dispatch("CREATE",
		{
			table: riskLeverTable,
			requestData:
				{
					name: name,
					description: description,

					min_exp_loss_5: min_5,
					min_exp_loss_4: min_4,
					min_exp_loss_3: min_3,
					min_exp_loss_2: min_2,
					min_exp_loss_1: min_1,

					max_exp_loss_5: max_5,
					max_exp_loss_4: max_4,
					max_exp_loss_3: max_3,
					max_exp_loss_2: max_2,
					max_exp_loss_1: max_1,

					risk_5_desc: description_5,
					risk_4_desc: description_4,
					risk_3_desc: description_3,
					risk_2_desc: description_2,
					risk_1_desc: description_1
				}
		}
	);

	dispatch("MODAL_CLOSED");
};

const editRiskLeverEffect = ({ state, dispatch }) => {
	let name = state.name ? state.name : "";
	let description = state.description ? state.description : "";

	let description_5 = state.risk_level_5_description ? state.risk_level_5_description : (state.selectedRiskLever.risk_5_desc ? state.selectedRiskLever.risk_5_desc : "");
	let description_4 = state.risk_level_4_description ? state.risk_level_4_description : (state.selectedRiskLever.risk_4_desc ? state.selectedRiskLever.risk_4_desc : "");
	let description_3 = state.risk_level_3_description ? state.risk_level_3_description : (state.selectedRiskLever.risk_3_desc ? state.selectedRiskLever.risk_3_desc : "");
	let description_2 = state.risk_level_2_description ? state.risk_level_2_description : (state.selectedRiskLever.risk_2_desc ? state.selectedRiskLever.risk_2_desc : "");
	let description_1 = state.risk_level_1_description ? state.risk_level_1_description : (state.selectedRiskLever.risk_1_desc ? state.selectedRiskLever.risk_1_desc : "");

	let min_5 = state.risk_level_5_min ? state.risk_level_5_min : (state.selectedRiskLever.min_exp_loss_5 ? state.selectedRiskLever.min_exp_loss_5 : "");
	let min_4 = state.risk_level_4_min ? state.risk_level_4_min : (state.selectedRiskLever.min_exp_loss_4 ? state.selectedRiskLever.min_exp_loss_4 : "");
	let min_3 = state.risk_level_3_min ? state.risk_level_3_min : (state.selectedRiskLever.min_exp_loss_3 ? state.selectedRiskLever.min_exp_loss_3 : "");
	let min_2 = state.risk_level_2_min ? state.risk_level_2_min : (state.selectedRiskLever.min_exp_loss_2 ? state.selectedRiskLever.min_exp_loss_2 : "");
	let min_1 = state.risk_level_1_min ? state.risk_level_1_min : (state.selectedRiskLever.min_exp_loss_1 ? state.selectedRiskLever.min_exp_loss_1 : "");

	let max_5 = state.risk_level_5_max ? state.risk_level_5_max : (state.selectedRiskLever.max_exp_loss_5 ? state.selectedRiskLever.max_exp_loss_5 : "");
	let max_4 = state.risk_level_4_max ? state.risk_level_4_max : (state.selectedRiskLever.max_exp_loss_4 ? state.selectedRiskLever.max_exp_loss_4 : "");
	let max_3 = state.risk_level_3_max ? state.risk_level_3_max : (state.selectedRiskLever.max_exp_loss_3 ? state.selectedRiskLever.max_exp_loss_3 : "");
	let max_2 = state.risk_level_2_max ? state.risk_level_2_max : (state.selectedRiskLever.max_exp_loss_2 ? state.selectedRiskLever.max_exp_loss_2 : "");
	let max_1 = state.risk_level_1_max ? state.risk_level_1_max : (state.selectedRiskLever.max_exp_loss_1 ? state.selectedRiskLever.max_exp_loss_1 : "");

	dispatch("EDIT",
		{
			table: riskLeverTable,
			sys_id: state.selectedRiskLever.sys_id,
			requestData:
				{
					name: name,
					description: description,

					min_exp_loss_5: min_5,
					min_exp_loss_4: min_4,
					min_exp_loss_3: min_3,
					min_exp_loss_2: min_2,
					min_exp_loss_1: min_1,

					max_exp_loss_5: max_5,
					max_exp_loss_4: max_4,
					max_exp_loss_3: max_3,
					max_exp_loss_2: max_2,
					max_exp_loss_1: max_1,

					risk_5_desc: description_5,
					risk_4_desc: description_4,
					risk_3_desc: description_3,
					risk_2_desc: description_2,
					risk_1_desc: description_1
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
	let riskLevers;
	if (state.showRiskLeversLoading) {
		riskLevers = <now-loader id="loader"></now-loader>
	} else {
		riskLevers =
			<div>
				<h2 id="title">
					<u>
						Risk Levers
					</u>
				</h2>
				<ul id="list">
					{state.riskLevers.length ? (
						state.riskLevers.map((result) => (
							<li id="list_item">
								{result.name}
								<now-button id="view" on-click={() => updateState({ selectedRiskLever: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Risk Levers Found</li>
					)}
					<now-button id="create_new" on-click={() => updateState({ createNewRL: true })}>Create New RL</now-button>
					{state.createNewRL ? (
						<now-modal
							opened={state.createNewRL}
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
									clickActionType: "CREATE_NEW_RISK_LEVER_METHOD",
								},
							]}
						>
							<h1>
								Create New Risk Lever
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

					{state.selectedRiskLever ? (
						<now-modal
							opened={state.selectedRiskLever}
							size="lg"
							footerActions={[
								{
									label: "Done",
									variant: "secondary",
									clickActionType: "NOW_MODAL#OPENED_SET",
								},
							]}
						>
							{state.editRL ? (
								<div>
									<h1>
										Editing: {state.selectedRiskLever.name}
										<now-button id="edit" on-click={() => updateState({ editRL: !state.editRL })}>{state.editRL ? "Cancel" : "Edit"}</now-button>
									</h1>
									Risk Lever
									<br/><br/>
									Name: <input value={state.selectedRiskLever.name} onchange={(e) => updateState({ name: e.target.value })}></input>
									<br/><br/>
									Date Created: {state.selectedRiskLever.sys_created_on}
									<br/><br/>
									Created By: {state.selectedRiskLever.sys_created_by}
									<br/><br/>
									Description: <textarea value={state.selectedRiskLever.description} onchange={(e) => updateState({ description: e.target.value })}></textarea>
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
										<textarea value={state.selectedRiskLever.risk_5_desc} onchange={(e) => updateState({ risk_level_5_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedRiskLever.risk_4_desc} onchange={(e) => updateState({ risk_level_4_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedRiskLever.risk_3_desc} onchange={(e) => updateState({ risk_level_3_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedRiskLever.risk_2_desc} onchange={(e) => updateState({ risk_level_2_description: e.target.value })}></textarea>
										<br/>
										<textarea value={state.selectedRiskLever.risk_1_desc} onchange={(e) => updateState({ risk_level_1_description: e.target.value })}></textarea>
									</span>
									<span id="column">
										<u>
											Min
										</u>
										<br/>
										<input value={state.selectedRiskLever.min_exp_loss_5} onchange={(e) => updateState({ risk_level_5_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.min_exp_loss_4} onchange={(e) => updateState({ risk_level_4_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.min_exp_loss_3} onchange={(e) => updateState({ risk_level_3_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.min_exp_loss_2} onchange={(e) => updateState({ risk_level_2_min: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.min_exp_loss_1} onchange={(e) => updateState({ risk_level_1_min: e.target.value })}></input>
									</span>
									<span id="column">
										<u>
											Max
										</u>
										<br/>
										<input value={state.selectedRiskLever.max_exp_loss_5} onchange={(e) => updateState({ risk_level_5_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.max_exp_loss_4} onchange={(e) => updateState({ risk_level_4_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.max_exp_loss_3} onchange={(e) => updateState({ risk_level_3_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.max_exp_loss_2} onchange={(e) => updateState({ risk_level_2_max: e.target.value })}></input>
										<br/>
										<input value={state.selectedRiskLever.max_exp_loss_1} onchange={(e) => updateState({ risk_level_1_max: e.target.value })}></input>
									</span>
									<br/><br/>
									<div>
										<now-button on-click={() => dispatch("EDIT_RISK_LEVER_METHOD")}>Finish Editing</now-button>
									</div>
								</div>
								) : (
								<div>
									<h1>
										{state.selectedRiskLever.name}
										<now-button id="edit" on-click={() => updateState({ editRL: !state.editRL, name: state.selectedRiskLever.name, description: state.selectedRiskLever.description })}>Edit</now-button>
									</h1>
									Risk Lever
									<br/><br/>
									Date Created: {state.selectedRiskLever.sys_created_on}
									<br/><br/>
									Created By: {state.selectedRiskLever.sys_created_by}
									<br/><br/>
									Description: {state.selectedRiskLever.description}
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
										{state.selectedRiskLever.risk_5_desc}
										<br/>
										{state.selectedRiskLever.risk_4_desc}
										<br/>
										{state.selectedRiskLever.risk_3_desc}
										<br/>
										{state.selectedRiskLever.risk_2_desc}
										<br/>
										{state.selectedRiskLever.risk_1_desc}
									</span>
									<span id="column">
										<u>
											Min
										</u>
										<br/>
										{state.selectedRiskLever.min_exp_loss_5}
										<br/>
										{state.selectedRiskLever.min_exp_loss_4}
										<br/>
										{state.selectedRiskLever.min_exp_loss_3}
										<br/>
										{state.selectedRiskLever.min_exp_loss_2}
										<br/>
										{state.selectedRiskLever.min_exp_loss_1}
									</span>
									<span id="column">
										<u>
											Max
										</u>
										<br/>
										{state.selectedRiskLever.max_exp_loss_5}
										<br/>
										{state.selectedRiskLever.max_exp_loss_4}
										<br/>
										{state.selectedRiskLever.max_exp_loss_3}
										<br/>
										{state.selectedRiskLever.max_exp_loss_2}
										<br/>
										{state.selectedRiskLever.max_exp_loss_1}
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
													{state.fetched_projects[result].name}
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
													{state.fetched_projects[result].name}
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
				{riskLevers}
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
				selectedRiskLever: null,
				createNewRL: false,
				createNewBU: false,
				editRL: false,
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

		// risk lever handlers
		GET_RISK_LEVERS: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			startActionType: "GET_RISK_LEVERS_STARTED",
			successActionType: "GET_RISK_LEVERS_FETCHED",
		}),
		GET_RISK_LEVERS_STARTED: ({ updateState }) =>
			updateState({ showRiskLeversLoading: true, editRL: false }),
		GET_RISK_LEVERS_FETCHED: ({ action, updateState }) => {
			// action.payload.result.map((result) => (
			// 	console.log(result)
			// ))
			updateState({ riskLevers: action.payload.result, showRiskLeversLoading: false });
		},
		'CREATE_NEW_RISK_LEVER_METHOD': createNewRiskLeverEffect,
		'EDIT_RISK_LEVER_METHOD': editRiskLeverEffect,
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
