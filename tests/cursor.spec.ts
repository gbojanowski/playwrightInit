import { test, expect } from '@playwright/test';

test('fill and submit DemoQA practice form', async ({ page }) => {
  // Go to the initial page
  await page.goto('https://demoqa.com/');

  // Navigate using getByText
  await page.getByText('Forms').click();
  await page.getByText('Practice Form').click();

  // Define test data
  const testData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    mobile: '1234567890',
    dob: { day: '10', month: 'May', year: '1990' }, // Example date
    subjects: ['Maths', 'Physics'],
    hobbies: ['Sports', 'Music'],
    address: '123 Test St, Testville',
    state: 'NCR',
    city: 'Delhi'
  };

  // Fill the form using getByPlaceholder where possible
  await page.getByPlaceholder('First Name').fill(testData.firstName);
  await page.getByPlaceholder('Last Name').fill(testData.lastName);
  await page.getByPlaceholder('name@example.com').fill(testData.email);
  await page.locator(`input[name="gender"][value="${testData.gender}"] + label`).click();
  await page.getByPlaceholder('Mobile Number').fill(testData.mobile);

  // Date of Birth - Keep existing logic for date picker component
  await page.locator('#dateOfBirthInput').click();
  await page.locator('.react-datepicker__month-select').selectOption({ label: testData.dob.month });
  await page.locator('.react-datepicker__year-select').selectOption({ value: testData.dob.year });
  await page.locator('.react-datepicker__month').getByText(testData.dob.day, { exact: true }).first().click();

  // Subjects - type and select using getByText for the option
  const subjectsInput = page.locator('#subjectsInput');
  for (const subject of testData.subjects) {
    await subjectsInput.fill(subject);
    await page.locator('.subjects-auto-complete__menu-list').locator('.subjects-auto-complete__option', { hasText: subject }).click();
  }

  // Hobbies - Target the label and click it
  for (const hobby of testData.hobbies) {
    await page.locator('label').filter({ hasText: hobby }).click();
  }

  // Use getByPlaceholder for address
  await page.getByPlaceholder('Current Address').fill(testData.address);

  // State and City - click dropdown, then select option using getByText
  await page.locator('#state').click();
  await page.getByText(testData.state, { exact: true }).click();
  await page.locator('#city').click();
  await page.getByText(testData.city, { exact: true }).click();

  // Submit the form using getByRole
  await page.getByRole('button', { name: 'Submit' }).click();

  // Verify the confirmation modal using getByRole
  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal.locator('#example-modal-sizes-title-lg')).toBeVisible();

  // Verify submitted data in the modal using adjacent sibling selector
  await expect(modal.locator('td:has-text("Student Name") + td')).toHaveText(`${testData.firstName} ${testData.lastName}`);
  await expect(modal.locator('td:has-text("Student Email") + td')).toHaveText(testData.email);
  await expect(modal.locator('td:has-text("Gender") + td')).toHaveText(testData.gender);
  await expect(modal.locator('td:has-text("Mobile") + td')).toHaveText(testData.mobile);
  // await expect(modal.locator('td:has-text("Date of Birth") + td')).toHaveText(...); // Add formatted date check
  await expect(modal.locator('td:has-text("Subjects") + td')).toHaveText(testData.subjects.join(', '));
  await expect(modal.locator('td:has-text("Hobbies") + td')).toHaveText(testData.hobbies.join(', '));
  // await expect(modal.locator('td:has-text("Address") + td')).toHaveText("olaboga! Papieża obrażajo!"); // Keep incorrect assertion for now
  await expect(modal.locator('td:has-text("State and City") + td')).toHaveText(`${testData.state} ${testData.city}`);

  // Close the modal (optional)
  await modal.getByRole('button', { name: 'Close' }).click();
  await expect(modal).not.toBeVisible();
});

test('process alerts', async ({ page }) => {
  // Test steps for processing alerts go here
});

test('interact with dynamic elements', async ({ page }) => {
  // Test steps for interacting with dynamic elements go here
});

test('table operations', async ({ page }) => {
  // Test steps for table operations go here
});

test('menu operations', async ({ page }) => {
  // Test steps for menu operations go here
});

test('drag and drop', async ({ page }) => {
  // Test steps for drag and drop operations go here
});

test('interactive elements', async ({ page }) => {
  // Test steps for interacting with other interactive elements go here
});
