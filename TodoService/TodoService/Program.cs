using Microsoft.EntityFrameworkCore;
using TodoService;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDbContext>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapGet("/", () => "Hello world!").WithName("Get");
app.MapGet("/todos", async (TodoDbContext db) => await db.Todos.ToListAsync());
app.MapGet("/todos/completes", async (TodoDbContext db) => await db.Todos.Where(t => t.Completed).ToListAsync());
app.MapGet("/todos/{id}", async (Guid id, TodoDbContext db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());
app.MapPost("/todos", async (Todo todo, TodoDbContext db) =>
{
    db.Todos.Add(todo);
    await db.SaveChangesAsync();

    return Results.Created($"/todos/{todo.Id}", todo);
});
app.MapPut("/todos/{id}", async (Guid id, Todo inputTodo, TodoDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();

    todo.Name = inputTodo.Name;
    todo.Completed = inputTodo.Completed;

    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/todos/{id}", async (int id, TodoDbContext db) =>
{
    if (await db.Todos.FindAsync(id) is Todo todo)
    {
        db.Todos.Remove(todo);
        await db.SaveChangesAsync();
        return Results.Ok(todo);
    }

    return Results.NotFound();
});

app.Run();