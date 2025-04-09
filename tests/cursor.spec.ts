import { test, expect } from '@playwright/test';

test('fill and submit DemoQA practice form', async ({ page }) => {
  // Go to the initial page
  await page.goto('https://demoqa.com/');

  // Navigate to Forms -> Practice Form
  await page.locator('div.card').filter({ hasText: 'Forms' }).click();
  await page.locator('li span.text').filter({ hasText: 'Practice Form' }).click();

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

  // Fill the form
  await page.locator('#firstName').fill(testData.firstName);
  await page.locator('#lastName').fill(testData.lastName);
  await page.locator('#userEmail').fill(testData.email);
  await page.locator(`input[name="gender"][value="${testData.gender}"] + label`).click();
  await page.locator('#userNumber').fill(testData.mobile);

  // Date of Birth - open picker and select day, month, year
  await page.locator('#dateOfBirthInput').click();
  await page.locator('.react-datepicker__month-select').selectOption({ label: testData.dob.month });
  await page.locator('.react-datepicker__year-select').selectOption({ value: testData.dob.year });
  await page.locator(`.react-datepicker__day--0${testData.dob.day}:not(.react-datepicker__day--outside-month)`).click();


  // Subjects - type and select from autocomplete
  const subjectsInput = page.locator('#subjectsInput');
  for (const subject of testData.subjects) {
    await subjectsInput.fill(subject);
    await page.locator(`#react-select-2-option-0`).click(); // Select the first suggestion
  }

  // Hobbies - check checkboxes
  for (const hobby of testData.hobbies) {
    await page.locator('label').filter({ hasText: hobby }).check();
  }

  await page.locator('#currentAddress').fill(testData.address);

  // State and City - select from dropdowns
  await page.locator('#state').click();
  await page.locator('#react-select-3-option-0').click(); // Select first state (NCR) - adjust index/logic if needed
  // Need to wait for city dropdown to populate based on state
  await page.waitForTimeout(500); // Simple wait, consider more robust waits if needed
  await page.locator('#city').click();
  await page.locator('#react-select-4-option-0').click(); // Select first city (Delhi) - adjust index/logic if needed

  // Submit the form
  await page.locator('#submit').click();

  // Verify the confirmation modal
  const modal = page.locator('.modal-content');
  await expect(modal).toBeVisible();
  await expect(modal.locator('#example-modal-sizes-title-lg')).toHaveText('Thanks for submitting the form');

  // Verify submitted data in the modal (add assertions for all fields)
  const tableRows = modal.locator('tbody tr');
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Student Name' }) }).locator('td').nth(1)).toHaveText(`${testData.firstName} ${testData.lastName}`);
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Student Email' }) }).locator('td').nth(1)).toHaveText(testData.email);
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Gender' }) }).locator('td').nth(1)).toHaveText(testData.gender);
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Mobile' }) }).locator('td').nth(1)).toHaveText(testData.mobile);
  // Date assertion needs formatting - Playwright will get the input value, modal shows formatted
  // await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Date of Birth' }) }).locator('td').nth(1)).toHaveText(...); // Add formatted date check
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Subjects' }) }).locator('td').nth(1)).toHaveText(testData.subjects.join(', '));
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Hobbies' }) }).locator('td').nth(1)).toHaveText(testData.hobbies.join(', '));
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'Address' }) }).locator('td').nth(1)).toHaveText("olaboga! Papieża obrażajo!");
  await expect(tableRows.filter({ has: page.locator('td', { hasText: 'State and City' }) }).locator('td').nth(1)).toHaveText(`${testData.state} ${testData.city}`);


  // Close the modal (optional)
  await page.locator('#closeLargeModal').click();
  await expect(modal).not.toBeVisible();
});
