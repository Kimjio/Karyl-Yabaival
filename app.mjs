import express from "express";
import path from "path";

const app = express();
const port = parseInt(process.env.PORT) || 3000;

let total = 0;

const tokenMap = new Map();

const genToken = () => {
  const token = Math.floor(Math.random() * 1000000000000000);

  tokenMap.set(token, new Date().getTime());

  return token;
};

setInterval(() => {
  tokenMap.forEach((v, k) => {
    const date = new Date(v);
    if (date.setHours(date.getHours() + 1) < new Date().getTime()) {
      tokenMap.delete(k);
    }
  });
}, 30000);

app.use(express.json());

app.get("/karyl_rescue/index", (req, res) => {
  const data = {
    header: {
      date: new Date().getTime(),
      result: 1,
    },
    body: {
      total_rescue_number: total,
    },
  };
  res.json(data);
});

app.get("/karyl_rescue/start", (req, res) => {
  const data = {
    header: {
      date: new Date().getTime(),
      result: 1,
    },
    body: {
      token: genToken(),
    },
  };
  res.json(data);
});

app.post("/karyl_rescue/end", (req, res) => {
  if (!tokenMap.has(req.body.token) || !req.header('Game-Version')) {
    res.status(403).json({
      header: {
        date: new Date().getTime(),
        result: 0,
      },
    });
    return;
  }

  tokenMap.delete(req.body.token);

  total += req.body.rescue_number;

  const data = {
    header: {
      date: new Date().getTime(),
      result: 1,
    },
    body: [],
  };

  res.json(data);
});

app.get("/", (req, res) => {
  const lang = req.headers["accept-language"]?.split(',');

  if (lang[0].includes('ko')) {
    res.sendFile("static/ko.html", { root: path.resolve() });
    return;
  }

  res.sendFile("static/ja.html", { root: path.resolve() });
});

app.use(express.static("static"));

app.listen(port, () => {
  console.log(`Karyl & Yabaival app listening on port ${port}`);
});
