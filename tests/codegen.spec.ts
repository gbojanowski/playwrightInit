import { test, expect } from '@playwright/test';
test.describe('User Registration', () => {
  test('should register a new user', async ({ page }) => {
    const firstName = 'TestName';
    const lastName = 'TestLastName';
    const email = 'Test@Test.test';
    const gender = 'Male';
    const mobileNumber = '0999999999';
    const subject = 'testSubject';
    const hobbies = 'Sports';
    const currentAddress = 'address';
    const state = 'NCR';
    const city = 'Noida';

    await page.goto('https://demoqa.com/');
    await page.getByRole('heading', { name: 'Forms' }).click();
    await page.getByText('Practice Form').click();
    await page.getByRole('textbox', { name: 'First Name' }).click();
    await page.getByRole('textbox', { name: 'First Name' }).fill(firstName);
    await page.getByRole('textbox', { name: 'First Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'Last Name' }).fill(lastName);
    await page.getByRole('textbox', { name: 'Last Name' }).press('Tab');
    await page.getByRole('textbox', { name: 'name@example.com' }).fill(email);
    await page.getByRole('textbox', { name: 'name@example.com' }).press('Tab');
    await page.getByText(gender, { exact: true }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).click();
    await page.getByRole('textbox', { name: 'Mobile Number' }).fill(mobileNumber);
    await page.getByRole('textbox', { name: 'Mobile Number' }).press('Tab');
    await page.locator('#dateOfBirthInput').press('Tab');
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('#subjectsInput').fill(subject);
    await page.getByText(hobbies).click();
    // await page.getByRole('textbox', { name: 'Select picture' }).click();
    //await page.getByRole('textbox', { name: 'Select picture' }).setInputFiles('Zrzut ekranu 2024-11-21 124028.png');
    //DOES NOT CHOOSE A FILE FROM LOCAL MACHINE 
    await page.locator('div').filter({ hasText: /^Select State$/ }).nth(3).click();
    await page.getByText(state, { exact: true }).click();
    await page.getByText('Select City').click();
    await page.getByText(city, { exact: true }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).click();
    await page.getByRole('textbox', { name: 'Current Address' }).fill(currentAddress);
    await page.getByRole('button', { name: 'Submit' }).click();

    await expect(page.getByRole('cell', { name: gender })).toBeVisible();
    await expect(page.getByRole('cell', { name: email })).toBeVisible();
    await expect(page.getByRole('cell', { name: `${firstName} ${lastName}` })).toBeVisible();
    await expect(page.getByRole('cell', { name: hobbies })).toBeVisible();
    await expect(page.getByRole('cell', { name: state + ' ' + city })).toBeVisible();
    await expect(page.locator('div').filter({ hasText: 'Thanks for submitting the form' }).nth(3)).toBeVisible();
  });
});



test.describe('User Login', () => {
  test('should log in an existing user', async ({ page }) => {
    // Add test steps for user login
  });
});

test.describe('Alert Handling', () => {
  //codegen: DOES NOT operate on alert popups. Does not wait for them, does not interact with them. They are not recorded.
  test('should process alerts correctly', async ({ page }) => {
  await page.goto('https://demoqa.com/alerts');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#alertButton').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#timerAlertButton').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#confirmButton').click();
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('#promtButton').click();
  });
});

test.describe('Dynamic Elements Interaction', () => {
  test('should interact with dynamic elements', async ({ page }) => {
    // Add test steps for interacting with dynamic elements
  });
});

test.describe('Table Operations', () => {
  test('should perform operations on a table', async ({ page }) => {
    // Add test steps for table operations
  });
});

test.describe('Menu Operations', () => {
  test('should interact with menu items', async ({ page }) => {
    // Add test steps for menu operations
  });
});

test.describe('Drag and Drop', () => {
  test('should perform drag and drop', async ({ page }) => {
    // Add test steps for drag and drop
  });
});

test.describe('Interactive Elements', () => {
  test('should interact with interactive elements', async ({ page }) => {
    // Add test steps for interactive elements
  });
});
