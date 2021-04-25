# Rainbogger

Rainbogger its a simple logger for your applications.
Now it has three levels of logs:

- debug -> <span style="color:yellow">[DEBUG] 25/4/2021 11:12:50:</span>
- info -> <span style="color:green">[INFO] 25/4/2021 11:12:50:</span>
- error -> <span style="color:red">[ERROR] 25/4/2021 11:12:50:</span>
- request -> <span style="color:blue">[REQUEST] 25/4/2021 11:12:50:</span>

## Installation

```bash
npm i rainbogger
```

## Usage

```node
import Rainbogger from "Rainbogger";

Rainbogger.debug("Test");
Rainbogger.info("Connected to database");
Rainbogger.error("I forgot my coffee");
Rainbogger.request("/api/endpoint");
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss
what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
