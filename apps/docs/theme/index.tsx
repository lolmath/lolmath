import Theme from "rspress/theme";
import { Homepage } from "../src/components/homepage";
import "../src/styles/layers.css";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";
import "@lolmath/ui/css";

const HomeLayout = () => <Homepage />;

export default {
	...Theme,
	HomeLayout,
};

// re-export
export * from "rspress/theme";
