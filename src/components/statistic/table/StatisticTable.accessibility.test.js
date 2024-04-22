import {render} from "@testing-library/react";
import {axe} from "jest-axe";
import StatisticTable from "./StatisticTable";

describe('StatisticCard', () => {
    it('should not have any accessibility violations', async () => {
        const stats = [{"timestamp":1708681980000,"totalConnections":3}];
        const { container } = render(<StatisticTable processedStatistics={stats} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
