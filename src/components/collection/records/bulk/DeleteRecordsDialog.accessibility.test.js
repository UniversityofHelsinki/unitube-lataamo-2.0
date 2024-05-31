import { render } from "@testing-library/react";
import DeleteRecordsDialog from "./DeleteRecordsDialog.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../../redux/reducers/MockProvider.js";

describe('DeleteRecordsDialog', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
						<DeleteRecordsDialog />
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

