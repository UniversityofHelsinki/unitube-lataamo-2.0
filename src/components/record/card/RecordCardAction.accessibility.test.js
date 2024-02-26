import { render } from "@testing-library/react";
import RecordCardAction from "./RecordCardAction.js";
import React from "react";
import { axe } from "jest-axe";
import { ReactComponent as RandomIcon } from '../../utilities/icons/alert.svg';

describe('RecordCardAction', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <RecordCardAction icon={<RandomIcon />} onClick={() => {}} label="Restore" />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
