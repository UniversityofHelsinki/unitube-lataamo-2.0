import {render} from "@testing-library/react";
import RecordStaticInformation from "./RecordStaticInformation";
import React from "react";
import {axe} from "jest-axe";


describe('RecordStaticInformation', () => {

    const record =
        { media:
                [ { url: 'https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D',
                    mimetype: 'video/mp4',
                    bitrate: 1923,
                    width: 1280,
                    height: 720,
                    filesize: 33554432,
                    duration: 3600,
                    codec: 'h264',
                    container: 'mp4', type: 'asdf' } ],
        };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordStaticInformation record={ record } />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
