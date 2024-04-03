import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TodoView from "@/components/TodoView/TodoView.vue";

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}

describe("TodoView", () => {
  it("should", async () => {
    const wrapper = mount(TodoView, {});
    await sleep(100);
    // console.log(wrapper.html());
    expect(wrapper.get(".completedPercentage").text()).toBe("33%");
  });
});
