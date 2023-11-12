import EventPlanner from './EventPlanner.js';

class App {
  async run() {
    const eventPlanner = new EventPlanner();
    await eventPlanner.getDateToVisit();
    await eventPlanner.getMenu();
    eventPlanner.previewBenefit();
  }
}

export default App;
