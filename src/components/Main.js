import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import View360 from "./pages/party/view360/View360";
import Update from "./pages/party/update/Update";
import { useMenu } from "../contexts/menuContext";
import { useActions } from "../contexts/actionsContext";
import { useTranslation } from "../contexts/translationContext";
import Routes from "./common/routes/Routes";

export default function Main({ history }) {
	const { menu, routes, ready } = useMenu();
	const { actions } = useActions();
	const { translations } = useTranslation();

	if (!menu || !routes || !actions || !translations)
		return <div>Loading...</div>;

	return (
		<Router history={history}>
			<Switch>
				{Routes(routes)}
				<Route exact path="/party/people/view360/:code/:personType">
					<View360 />
				</Route>
				<Route exact path="/party/people/:code/:personType/:section?">
					<Update />
				</Route>
			</Switch>
		</Router>
	);
}
