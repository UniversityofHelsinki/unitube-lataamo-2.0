import {render} from "@testing-library/react";
import RecordStaticInformation from "./RecordStaticInformation";
import React from "react";
import {axe} from "jest-axe";
import NotificationProvider from "../notification/NotificationContext";


describe('RecordStaticInformation', () => {
    const record = {
      identifier: 'asdf',
      downloadableMedia: {}
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <NotificationProvider>
            <RecordStaticInformation record={ record } />
          </NotificationProvider>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
