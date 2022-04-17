namespace TodoService;

public class Todo
{
    public Guid Id { get; set; }

    public string Text { get; set; } = string.Empty;

    public bool Completed { get; set; }
}
