import { render } from "@testing-library/react";
import MoveRecordsDialog from "./MoveRecordsDialog.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../../redux/reducers/MockProvider.js";

describe('MoveRecordsDialog', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
						<MoveRecordsDialog />
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

