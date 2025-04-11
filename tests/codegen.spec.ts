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
    await page.getByText('Forms', { exact: true }).click();
    await page.getByText('Practice Form', { exact: true }).click();
    await page.locator('#firstName').fill(firstName);
    await page.locator('#lastName').fill(lastName);
    await page.locator('#userEmail').fill(email);
    await page.locator(`input[name="gender"][value="${gender}"]`).check();
    await page.locator('#userNumber').fill(mobileNumber);
    await page.locator('#dateOfBirthInput').click();
    await page.locator('.react-datepicker__month-select').selectOption('0');
    await page.locator('.react-datepicker__year-select').selectOption('2007');
    await page.locator('.react-datepicker__day--005').click();
    await page.locator('.subjects-auto-complete__value-container').click();
    await page.locator('#subjectsInput').fill(subject);
    await page.locator('#subjectsInput').press('Enter');
    await page.locator(`label[for="hobbies-checkbox-1"]`).click();
    const filePath = 'C:\\Users\\gbojanowski\\Desktop\\Private\\AktorCzolo.jpg';
    await page.locator('#uploadPicture').setInputFiles(filePath);
    await page.locator('#state').click();
    await page.getByText(state, { exact: true }).click();
    await page.locator('#city').click();
    await page.getByText(city, { exact: true }).click();
    await page.locator('#currentAddress').fill(currentAddress);
    await page.locator('#submit').click();

    await expect(page.locator('td')).toContainText(gender);
    await expect(page.locator('td')).toContainText(email);
    await expect(page.locator('td')).toContainText(`${firstName} ${lastName}`);
    await expect(page.locator('td')).toContainText(hobbies);
    await expect(page.locator('td')).toContainText(`${state} ${city}`);
    await expect(page.locator('.modal-content')).toContainText('Thanks for submitting the form');
  });
});





test.describe('User Login', () => {
  test('should log in an existing user', async ({ page }) => {
    // Add test steps for user login
  });
});

test.describe('Alert Handling', () => {
  //codegen: DOES NOT operate on alert popups. Does not wait for them, does not interact with them. They are not recorded.
  //however it is possible to handle them using copilot.
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

test.describe('Alert Interaction', () => {
  test('should handle alert interactions', async ({ page }) => {
    await page.goto('https://demoqa.com/');
    await page.locator('div').filter({ hasText: /^Alerts, Frame & Windows$/ }).nth(2).click();
    await page.getByText('Alerts', { exact: true }).click();
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('#alertButton').click();
    console.log("Alert button clicked");

    //5sec delay
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.locator('#timerAlertButton').click();
    await page.waitForEvent('dialog');

    //choose button to click
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {}); // Click 'Cancel' (anuluj) instead of 'OK'
    });
    await page.locator('#confirmButton').click();

    //Prompted dialog
    page.once('dialog', dialog => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.accept('Test Prompt Input').catch(() => {});
    });
    await page.locator('#promtButton').click();
    
  });
});

test.describe('Frames Interactions', () => {
  test('should interact with frames', async ({ page }) => {
    await page.goto('https://demoqa.com/frames');
    const frame = await page.locator('#frame1').contentFrame();
    await frame?.getByRole('heading', { name: 'This is a sample page' }).evaluate((element) => {
      element.textContent = 'TEST';
    });

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
