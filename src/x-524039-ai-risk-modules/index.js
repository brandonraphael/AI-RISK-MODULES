import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { createHttpEffect } from "@servicenow/ui-effect-http";
import "@servicenow/now-modal";
import "@servicenow/now-button";
import "@servicenow/now-loader";

const fetchFoundationalRisksEffect = ({ properties, dispatch }) => {
	dispatch("GET_FOUNDATIONAL_RISKS", {
		table: "x_524039_pericrora_ai_foundational_risk",
		// sysparm_query: `short_descriptionLIKE${properties.searchText}`,
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
		foundationalRisks = <now-loader id="foundational_risks_loader"></now-loader>
	} else {
		foundationalRisks =
			<div>
				<h2 id="foundational_risks_title">
					<u>
						Foundational Risks
					</u>
				</h2>
				<ul id="foundational_risks">
					{state.foundationalRisks.length ? (
						state.foundationalRisks.map((result) => (
							<li id={"list_item"}>
								{result.name}
								<now-button id="view_foundational_risk" on-click={() => updateState({ selectedResult: result })}>View</now-button>
							</li>
						))
					) : (
						<li>No Foundational Risks Found</li>
					)}
					<now-button id="create_new_foundational_risk" >Create New FR</now-button>
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
							<br/>
							Date Created: {state.selectedResult.sys_created_on}
							<br/>
							Created By: {state.selectedResult.sys_created_by}
							<br/>
							Description: {state.selectedResult.description}
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
			</div>
		</div>
	);
	// return <button on-click={buttonClicked}>Click me!</button>
};

createCustomElement('x-524039-ai-risk-modules', {
	renderer: {type: snabbdom},
	view,
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: fetchFoundationalRisksEffect,
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
		'FETCH_SUCCEEDED': handleFetchSucceeded,
		'FETCH_FAILED': handleFetchFailed,
		'FETCH_STARTED': handleFetchStarted,
	},
	styles
});
