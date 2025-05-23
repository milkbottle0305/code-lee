import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 문제 1
  const problem1 = await prisma.problem.create({
    data: {
      title: "카운터 컴포넌트 구현",
      description: "React로 카운터 컴포넌트를 구현하세요.",
      difficulty: "easy",
    },
  });
  const commit1_1 = await prisma.commit.create({
    data: {
      message: "카운터 기본 구조",
      date: new Date("2024-05-01T10:00:00Z"),
      problemId: problem1.id,
    },
  });
  await prisma.commitFile.createMany({
    data: [
      {
        path: "Counter.tsx",
        name: "Counter.tsx",
        content: `
import React from "react";
export default function Counter() {
  return <div>0</div>;
}
        `.trim(),
        diff: `
+import React from "react";
+export default function Counter() {
+  return <div>0</div>;
+}
        `.trim(),
        commitId: commit1_1.id,
      },
      {
        path: "App.tsx",
        name: "App.tsx",
        content: `
import Counter from "./Counter";
export default function App() {
  return <Counter />;
}
        `.trim(),
        diff: `
+import Counter from "./Counter";
+export default function App() {
+  return <Counter />;
+}
        `.trim(),
        commitId: commit1_1.id,
      },
    ],
  });

  const commit1_2 = await prisma.commit.create({
    data: {
      message: "카운터 useState 적용",
      date: new Date("2024-05-01T11:00:00Z"),
      problemId: problem1.id,
    },
  });
  await prisma.commitFile.createMany({
    data: [
      {
        path: "Counter.tsx",
        name: "Counter.tsx",
        content: `
import React, { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  return <div>{count}</div>;
}
        `.trim(),
        diff: `
-import React from "react";
+import React, { useState } from "react";
 export default function Counter() {
-  return <div>0</div>;
+  const [count, setCount] = useState(0);
+  return <div>{count}</div>;
 }
        `.trim(),
        commitId: commit1_2.id,
      },
    ],
  });

  const commit1_3 = await prisma.commit.create({
    data: {
      message: "증가 버튼 추가",
      date: new Date("2024-05-01T12:00:00Z"),
      problemId: problem1.id,
    },
  });
  await prisma.commitFile.createMany({
    data: [
      {
        path: "Counter.tsx",
        name: "Counter.tsx",
        content: `
import React, { useState } from "react";
export default function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <div>{count}</div>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}
        `.trim(),
        diff: `
 return (
-  <div>{count}</div>;
+  <div>
+    <div>{count}</div>
+    <button onClick={() => setCount(count + 1)}>증가</button>
+  </div>
 );
        `.trim(),
        commitId: commit1_3.id,
      },
    ],
  });

  // 문제 2
  const problem2 = await prisma.problem.create({
    data: {
      title: "Todo 리스트 구현",
      description: "할 일 목록을 추가/삭제할 수 있는 컴포넌트를 만드세요.",
      difficulty: "medium",
    },
  });
  const commit2_1 = await prisma.commit.create({
    data: {
      message: "기본 TodoList 컴포넌트",
      date: new Date("2024-05-02T10:00:00Z"),
      problemId: problem2.id,
    },
  });
  await prisma.commitFile.createMany({
    data: [
      {
        path: "TodoList.tsx",
        name: "TodoList.tsx",
        content: `
import React from "react";
export default function TodoList() {
  return <div>할 일 없음</div>;
}
        `.trim(),
        diff: `
+import React from "react";
+export default function TodoList() {
+  return <div>할 일 없음</div>;
+}
        `.trim(),
        commitId: commit2_1.id,
      },
      {
        path: "App.tsx",
        name: "App.tsx",
        content: `
import TodoList from "./TodoList";
export default function App() {
  return <TodoList />;
}
        `.trim(),
        diff: `
+import TodoList from "./TodoList";
+export default function App() {
+  return <TodoList />;
+}
        `.trim(),
        commitId: commit2_1.id,
      },
    ],
  });

  const commit2_2 = await prisma.commit.create({
    data: {
      message: "할 일 추가 기능",
      date: new Date("2024-05-02T11:00:00Z"),
      problemId: problem2.id,
    },
  });
  await prisma.commitFile.createMany({
    data: [
      {
        path: "TodoList.tsx",
        name: "TodoList.tsx",
        content: `
import React, { useState } from "react";
export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={() => { setTodos([...todos, input]); setInput(""); }}>추가</button>
      <ul>
        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
      </ul>
    </div>
  );
}
        `.trim(),
        diff: `
-import React from "react";
+import React, { useState } from "react";
 export default function TodoList() {
-  return <div>할 일 없음</div>;
+  const [todos, setTodos] = useState<string[]>([]);
+  const [input, setInput] = useState("");
+  return (
+    <div>
+      <input value={input} onChange={e => setInput(e.target.value)} />
+      <button onClick={() => { setTodos([...todos, input]); setInput(""); }}>추가</button>
+      <ul>
+        {todos.map((todo, i) => <li key={i}>{todo}</li>)}
+      </ul>
+    </div>
+  );
 }
        `.trim(),
        commitId: commit2_2.id,
      },
    ],
  });

  const commit2_3 = await prisma.commit.create({
    data: {
      message: "할 일 삭제 기능",
      date: new Date("2024-05-02T12:00:00Z"),
      problemId: problem2.id,
    },
  });
  await prisma.commitFile.createMany({
    data: [
      {
        path: "TodoList.tsx",
        name: "TodoList.tsx",
        content: `
import React, { useState } from "react";
export default function TodoList() {
  const [todos, setTodos] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const remove = (idx: number) => setTodos(todos.filter((_, i) => i !== idx));
  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={() => { setTodos([...todos, input]); setInput(""); }}>추가</button>
      <ul>
        {todos.map((todo, i) => (
          <li key={i}>
            {todo}
            <button onClick={() => remove(i)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
        `.trim(),
        diff: `
 const [todos, setTodos] = useState<string[]>([]);
 const [input, setInput] = useState("");
+const remove = (idx: number) => setTodos(todos.filter((_, i) => i !== idx));
 return (
   <div>
     <input value={input} onChange={e => setInput(e.target.value)} />
     <button onClick={() => { setTodos([...todos, input]); setInput(""); }}>추가</button>
     <ul>
-      {todos.map((todo, i) => <li key={i}>{todo}</li>)}
+      {todos.map((todo, i) => (
+        <li key={i}>
+          {todo}
+          <button onClick={() => remove(i)}>삭제</button>
+        </li>
+      ))}
     </ul>
   </div>
 );
        `.trim(),
        commitId: commit2_3.id,
      },
    ],
  });

  // ...문제 3~10도 위와 같은 방식으로 각 문제별로 커밋 3개 이상, 각 커밋마다 여러 파일(React/Next.js 코드)로 구성해서 추가...
  // (아래는 예시, 실제로는 문제별로 다양한 컴포넌트/기능/코드로 구성)

  // 문제 3
  const problem3 = await prisma.problem.create({
    data: {
      title: "다크모드 토글 구현",
      description: "Next.js에서 다크모드 토글 버튼을 구현하세요.",
      difficulty: "easy",
    },
  });
  const commit3_1 = await prisma.commit.create({
    data: {
      message: "다크모드 context 생성",
      date: new Date("2024-05-03T10:00:00Z"),
      problemId: problem3.id,
    },
  });
  await prisma.commitFile.createMany({
    data: [
      {
        path: "DarkModeContext.tsx",
        name: "DarkModeContext.tsx",
        content: `
import { createContext } from "react";
export const DarkModeContext = createContext({ dark: false, toggle: () => {} });
        `.trim(),
        diff: `
+import { createContext } from "react";
+export const DarkModeContext = createContext({ dark: false, toggle: () => {} });
        `.trim(),
        commitId: commit3_1.id,
      },
      {
        path: "App.tsx",
        name: "App.tsx",
        content: `
import { DarkModeContext } from "./DarkModeContext";
export default function App() {
  return <div>다크모드 예제</div>;
}
        `.trim(),
        diff: `
+import { DarkModeContext } from "./DarkModeContext";
+export default function App() {
+  return <div>다크모드 예제</div>;
+}
        `.trim(),
        commitId: commit3_1.id,
      },
    ],
  });

  // ...문제 4~10도 위와 같이 각 문제별로 커밋 3개 이상, 각 커밋마다 여러 파일(실제 코드)로 구성해서 추가하세요.

  // (실제 seed 데이터가 길어지므로, 위 패턴을 복사해서 문제 4~10에 맞는 제목/설명/코드/커밋/파일/변경점으로 다양하게 구성하면 됩니다.)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
