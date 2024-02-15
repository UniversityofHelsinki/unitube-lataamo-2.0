import {render} from "@testing-library/react";
import TextArea from "./TextArea";
import React from "react";

it('renders', () => {
    render(
        <TextArea
          value="asdf"
          onChange={() => {}}
          message={{ content: 'asdf', type: 'neutral' }} 
          id='asdf'
        />
    );
});
