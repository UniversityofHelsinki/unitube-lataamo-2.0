import {render} from "@testing-library/react";
import {axe} from "jest-axe";
import Statistic from "./Statistic";
import {MockProvider} from "../../redux/reducers/MockProvider";

describe('StatisticCard', () => {
    it('should not have any accessibility violations', async () => {
        const { container } = render(<MockProvider><Statistic /></MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
