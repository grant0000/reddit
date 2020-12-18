import Navbar from "./Navbar";

// setup file
import { shallow } from "enzyme";

describe("Navbar testing", () => {
  test("render the title of the Navbar", () => {
    const wrapper = shallow(<Navbar />);
    expect(wrapper.find("WithStyles(ForwardRef(Typography))").text()).toContain(
      "Reddit Reduced"
    );
  });
});
