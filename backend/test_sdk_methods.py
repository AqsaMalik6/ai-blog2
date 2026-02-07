from agents import Runner
import inspect

print("Runner methods:")
for name, member in inspect.getmembers(Runner):
    if not name.startswith("__"):
        print(f" - {name}")
