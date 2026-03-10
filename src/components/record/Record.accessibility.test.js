import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Record from "./Record";
import React from "react";
import {axe} from "jest-axe";

describe('Record', () => {

    const reducers = {
        location: {
            searchParameters: {
                record: 'asdfasdf'
            },
            path: '/records'
        },
        collections: {
            collections: [{ identifier: 'asdf-asdf', title: 'asdfasdf' }]
        },
        vttfiles: {
            vttfilesdata: [
                {
                    lang: "swe",
                    url: "ruotsi.vtt"
                },
                {
                    lang: "eng",
                    url: "englanti.vtt"
                },
                {
                    lang: "fin",
                    url: "suomi_teksti.vtt"
                }
        ]},
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <Record />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
