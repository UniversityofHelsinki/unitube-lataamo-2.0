import { render } from "@testing-library/react";
import RecordsTableDialog from "./RecordsTableDialog.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../redux/reducers/MockProvider.js";

describe('RecordsTableDialog', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
						<RecordsTableDialog />
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

