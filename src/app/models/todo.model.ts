export default class Todo {
  _id: string;
  text: string;
  description: string;
  date: Date;
  status: string;

  constructor(
  ) {
    this.text = ""
    this.description = ""
    this.date = new Date()
    this.status = ""
  }

  static generateMockTodo(): Todo {
    return {
      _id: "new",
      text: "",
      description: "",
      date: new Date(),
      status: ""
    }
  }
}
