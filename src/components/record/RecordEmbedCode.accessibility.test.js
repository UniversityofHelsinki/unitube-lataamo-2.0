import {render} from "@testing-library/react";
import RecordEmbedCode from "./RecordEmbedCode";
import React from "react";
import {axe} from "jest-axe";
import NotificationProvider from "../notification/NotificationContext";


describe('RecordEmbedCode', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <NotificationProvider>
            <RecordEmbedCode
              identifier="aaaa-bbbb-cccc-eeee-ffff-0000"
            />
          </NotificationProvider>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

