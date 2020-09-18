import {createCustomElement, actionTypes} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import { createHttpEffect } from "@servicenow/ui-effect-http";

// Http Effect Function
// This will be executed when triggered by some action
// async function httpEffect(url, options, coeffects) {
// 	const {action, dispatch} = coeffects;
//
// 	dispatch('FETCH_STARTED');
// 	try {
// 		const result = await fetch(url, options);
// 		dispatch('FETCH_SUCCEEDED', result);
// 	} catch(e) {
// 		dispatch('FETCH_FAILED', e, {} /* meta */, true /* error */);
// 	}
// }

// Create the effect
// Function that takes in some arguments and creates an effect
// This is generic and can be reused anywhere http requests are needed
// function createHttpEffect(url, options) {
// 	return {
// 		effect: httpEffect,
// 		args: [url, options]
// 	};
// }

// Create the effect for fetching a user
const fetchUserEffect = ({ properties, dispatch }) => {
	if (true) {
		dispatch("SEARCH_RESULTS_REQUESTED", {
			table: "x_524039_pericrora_ai_foundational_risk",
			// sysparm_query: `short_descriptionLIKE${properties.searchText}`,
		});
	}
};
// Handle when user fetch succeeded: log the result
const handleFetchUserSucceeded = ({action, updateState}) => {
	console.log(action.payload);
	action.payload.result.map((result) => (
		console.log(result)
	))
}

// Handle when user fetch failed: alert failure message
const handleFetchUserFailed = ({action}) => {
	console.log("User fetch failed!");
}

const handleFetchStarted = ({action}) => console.log("Started fetch of table");

const view = (state, { dispatch }) => {
	function buttonClicked() {
		dispatch('USER_FETCHED');
	}

	return;
	// return <button on-click={buttonClicked}>Click me!</button>
};

createCustomElement('x-524039-ai-risk-modules', {
	renderer: {type: snabbdom},
	view,
	actionHandlers: {
		[actionTypes.COMPONENT_CONNECTED]: fetchUserEffect,
		// This would be dispatched within the component's view or COMPONENT_CONNECTED action handler
		'USER_FETCHED': fetchUserEffect,
		// This is dispatched from the effect on success, handle it here
		'FETCH_SUCCEEDED': handleFetchUserSucceeded,
		SEARCH_RESULTS_REQUESTED: createHttpEffect("/api/now/table/:table", {
			pathParams: ["table"],
			// queryParams: ["sysparm_query"],
			successActionType: "SEARCH_RESULTS_FETCHED",
		}),
		SEARCH_RESULTS_FETCHED: ({ action, updateState }) => {
			console.log("here: ");
			console.log(action.payload.result);
			action.payload.result.map((result) => (
				console.log(result)
			))
			// updateState({ searchResults: action.payload.result, showLoading: false });
		},
		// 'FETCH_SUCCEEDED': (coeffects) => {

			// const { action, updateState } = coeffects;
			// const {
			// 	action: {
			// 		payload
			// 	}
			// } = coeffects;
			// console.log(payload.result);

			// const { result } = action.payload;

			// updateState({ result });

		// },
		// This is dispatched if the fetch failed, handle it here
		'FETCH_FAILED': handleFetchUserFailed,
		'FETCH_STARTED': handleFetchStarted,
	},
	styles
});
