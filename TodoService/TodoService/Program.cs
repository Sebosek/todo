using Microsoft.EntityFrameworkCore;
using TodoService;

const string CORS_POLICY = "localhost";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDbContext>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(o =>
{
    o.AddPolicy(CORS_POLICY, policy =>
    {
        policy.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(CORS_POLICY);
app.UseHttpsRedirection();
app.MapGet("/todos", async (TodoDbContext db) => await db.Todos.ToListAsync());
app.MapGet("/todos/completed", async (TodoDbContext db) => await db.Todos.Where(t => t.Completed).ToListAsync());
app.MapGet("/todos/{id}", async (Guid id, TodoDbContext db) =>
    await db.Todos.FindAsync(id)
        is Todo todo
            ? Results.Ok(todo)
            : Results.NotFound());
app.MapPost("/todos", async (TodoModel todo, TodoDbContext db) =>
{
    var entity = new Todo{ Id = Guid.NewGuid(), Text = todo.Text, Completed = todo.Completed};
    db.Todos.Add(entity);
    await db.SaveChangesAsync();

    return Results.Created($"/todos/{entity.Id}", entity);
});
app.MapPut("/todos/{id}", async (Guid id, TodoModel inputTodo, TodoDbContext db) =>
{
    var todo = await db.Todos.FindAsync(id);
    if (todo is null) return Results.NotFound();
    
    todo.Text = inputTodo.Text;
    todo.Completed = inputTodo.Completed;

    await db.SaveChangesAsync();
    return Results.NoContent();
});
app.MapDelete("/todos/{id}", async (Guid id, TodoDbContext db) =>
{
    if (await db.Todos.FindAsync(id) is not Todo todo) return Results.NotFound();
    
    db.Todos.Remove(todo);
    await db.SaveChangesAsync();
    return Results.NoContent();
});

app.Run();
