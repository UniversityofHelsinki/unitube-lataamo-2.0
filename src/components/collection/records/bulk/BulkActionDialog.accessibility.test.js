import { render } from "@testing-library/react";
import BulkActionDialog from "./BulkActionDialog.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../../redux/reducers/MockProvider.js";

describe('BulkActionDialog', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
            <BulkActionDialog 
              records={[]} 
              openerProps={{ variant: '', label: 'est' }}
              recordsTableProps={{}}
            />
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

