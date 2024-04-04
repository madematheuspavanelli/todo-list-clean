import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import TodoView from "@/components/TodoView/TodoView.vue";
import { TodoMemoryGateway } from "@/gateways/TodoMemoryGateway";

function sleep(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, milliseconds);
  });
}

describe("TodoView", () => {
  const todoGateway = new TodoMemoryGateway();

  it("should test screen", async () => {
    const wrapper = mount(TodoView, {
      global: {
        provide: {
          todoGateway,
        },
      },
    });
    await sleep(100);
    expect(wrapper.get(".completedPercentage").text()).toBe("33%");
  });
});
