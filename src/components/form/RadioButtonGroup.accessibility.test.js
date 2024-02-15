import {render} from "@testing-library/react";
import RadioButtonGroup from "./RadioButtonGroup";
import {PUBLICITIES} from "../../Constants";
import React from "react";
import {axe} from "jest-axe";


describe('RadioButtonGroup', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <div>
            {PUBLICITIES.map(p => 
              <label key={`${p.label}-p`} htmlFor={`publicity-${p.value}`}>{p.value}</label>
            )}
            <RadioButtonGroup
              label="Valinta"
              options={PUBLICITIES}
              onChange={() => {}} value={''}
            />
          </div>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
