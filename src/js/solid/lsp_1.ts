interface LessonRepository<T> {
  getAll: () => T[]
}


class Lessons implements LessonRepository<string> {
  getAll() {
    return ["One", "Two"];
  }
}

class FileLessons implements LessonRepository<string> {
  getAll() {
    return ["1", "2", "3"];
  }
}

class DbLessons implements LessonRepository<> {
  getAll() {
    return { one: "One", two: "Two" };
  }
}
