import { test, expect, Page } from "@playwright/test";
import { db } from "../src/database/db";
import { tasks } from "../src/database/schema/tasks";

const createTask = async (page: Page, title: string, description: string) => {
  const taskNameInput = await page
    .getByTestId("task-input")
    .getByPlaceholder(/Enter Task Name/i);
  await taskNameInput.fill(title);

  const taskDetailInput = await page
    .getByTestId("task-input")
    .getByPlaceholder(/Enter Task Description/i);
  await taskDetailInput.fill(description);

  const submitButton = await page.getByText(/Submit/i);
  await submitButton.click();
};

test.beforeEach(async () => {
  await db.delete(tasks);
});

test.describe("on load", () => {
  test("has task input", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("task-input")).toBeVisible();
  });

  test("has add task message", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByText(/Please Add a Task/i)).toBeVisible();
  });

  test("has no tasks", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByTestId("task")).not.toBeVisible();
  });
});

test("create and save tasks", async ({ page }) => {
  await page.goto("/");

  const taskNameInput = await page
    .getByTestId("task-input")
    .getByPlaceholder(/Enter Task Name/i);
  await taskNameInput.fill("task-one");

  const taskDetailInput = await page
    .getByTestId("task-input")
    .getByPlaceholder(/Enter Task Description/i);
  await taskDetailInput.fill("task-one-details");

  const submitButton = await page.getByText(/Submit/i);
  await submitButton.click();

  await expect(
    page.getByTestId("task-1").getByTestId("task-name-input-1")
  ).toHaveValue("task-one");
});

test.describe("delete tasks", () => {
  test("delete one task", async ({ page }) => {
    await page.goto("/");

    await createTask(page, "task-one", "task-one-description");
    await expect(
      page.getByTestId("task-1").getByTestId("task-name-input-1")
    ).toHaveValue("task-one");

    const deleteButton = await page.getByTestId("delete-button-1");
    await deleteButton.click();

    await expect(page.getByTestId("task-1")).not.toBeVisible();
  });

  test("delete three tasks", async ({ page }) => {
    await page.goto("/");

    await createTask(page, "task-one", "task-one-description");
    await createTask(page, "task-two", "task-two-description");
    await createTask(page, "task-three", "task-three-description");

    await expect(
      page.getByTestId("task-1").getByTestId("task-name-input-1")
    ).toHaveValue("task-one");
    await expect(
      page.getByTestId("task-2").getByTestId("task-name-input-2")
    ).toHaveValue("task-two");
    await expect(
      page.getByTestId("task-3").getByTestId("task-name-input-3")
    ).toHaveValue("task-three");

    const deleteButtonOne = await page.getByTestId("delete-button-1");
    await deleteButtonOne.click();
    await expect(page.getByTestId("task-1")).not.toBeVisible();

    const deleteButtonTwo = await page.getByTestId("delete-button-2");
    await deleteButtonTwo.click();
    await expect(page.getByTestId("task-2")).not.toBeVisible();

    const deleteButtonThree = await page.getByTestId("delete-button-3");
    await deleteButtonThree.click();
    await expect(page.getByTestId("task-3")).not.toBeVisible();
  });
});

test.describe("update tasks", () => {
  test("update one task", async ({ page }) => {
    await page.goto("/");

    await createTask(page, "task-one", "task-one-description");
    await expect(
      page.getByTestId("task-1").getByTestId("task-name-input-1")
    ).toHaveValue("task-one");

    const openToggle = await page.getByTestId("open-toggle-1");
    await openToggle.click();

    const titleInput = await page.getByTestId(`task-name-input-1`);
    await titleInput.fill("updated-task-one");

    const descriptionInput = await page.getByTestId("task-description-1");
    await descriptionInput.fill("updated-description-one");

    const checkbox = await page.getByTestId("completed-toggle-1");
    checkbox.click();

    await expect(page.getByTestId("task-name-input-1")).toHaveValue(
      "updated-task-one"
    );
    await expect(page.getByTestId("task-description-1")).toHaveValue(
      "updated-description-one"
    );
    await expect(page.getByTestId("completed-toggle-1")).toBeChecked();
  });

  test("update three tasks", async ({ page }) => {
    await page.goto("/");

    await createTask(page, "task-one", "task-one-description");
    await createTask(page, "task-two", "task-two-description");
    await createTask(page, "task-three", "task-three-description");

    await expect(
      page.getByTestId("task-1").getByTestId("task-name-input-1")
    ).toHaveValue("task-one");
    await expect(
      page.getByTestId("task-2").getByTestId("task-name-input-2")
    ).toHaveValue("task-two");
    await expect(
      page.getByTestId("task-3").getByTestId("task-name-input-3")
    ).toHaveValue("task-three");

    const openToggleOne = await page.getByTestId("open-toggle-1");
    const openToggleTwo = await page.getByTestId("open-toggle-2");
    const openToggleThree = await page.getByTestId("open-toggle-3");
    await openToggleOne.click();
    await openToggleTwo.click();
    await openToggleThree.click();

    const titleInputOne = await page.getByTestId(`task-name-input-1`);
    const titleInputTwo = await page.getByTestId(`task-name-input-2`);
    const titleInputThree = await page.getByTestId(`task-name-input-3`);
    await titleInputOne.fill("updated-task-one");
    await titleInputTwo.fill("updated-task-two");
    await titleInputThree.fill("updated-task-three");
    await expect(page.getByTestId("task-name-input-1")).toHaveValue(
      "updated-task-one"
    );
    await expect(page.getByTestId("task-name-input-2")).toHaveValue(
      "updated-task-two"
    );
    await expect(page.getByTestId("task-name-input-3")).toHaveValue(
      "updated-task-three"
    );

    const descriptionInputOne = await page.getByTestId("task-description-1");
    const descriptionInputTwo = await page.getByTestId("task-description-2");
    const descriptionInputThree = await page.getByTestId("task-description-3");
    await descriptionInputOne.fill("updated-description-one");
    await descriptionInputTwo.fill("updated-description-two");
    await descriptionInputThree.fill("updated-description-three");
    await expect(page.getByTestId("task-description-1")).toHaveValue(
      "updated-description-one"
    );
    await expect(page.getByTestId("task-description-2")).toHaveValue(
      "updated-description-two"
    );
    await expect(page.getByTestId("task-description-3")).toHaveValue(
      "updated-description-three"
    );

    const checkboxOne = await page.getByTestId("completed-toggle-1");
    checkboxOne.click();
    await expect(page.getByTestId("completed-toggle-1")).toBeChecked();
    const checkboxTwo = await page.getByTestId("completed-toggle-2");
    checkboxTwo.click();
    await expect(page.getByTestId("completed-toggle-2")).toBeChecked();
    const checkboxThree = await page.getByTestId("completed-toggle-3");
    checkboxThree.click();
    await expect(page.getByTestId("completed-toggle-3")).toBeChecked();
  });
});
