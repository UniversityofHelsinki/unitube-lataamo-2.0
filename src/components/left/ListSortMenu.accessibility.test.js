import { fireEvent, render, screen } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import ListSortMenu from "./ListSortMenu.js";
import React from "react";
import { axe } from "jest-axe";

describe('ListSortMenu', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <ListSortMenu 
              currentCriteria="asdf" 
              criterias={["asdf", "fdsa"]} 
              descending={false} 
              onSelect={() => {}} 
            />
          </MockProvider>
        );
        const button = screen.getByText("Järjestä");
        fireEvent.click(button);
        
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
