"use client";

export const DemoProjectCreator = () => {
  const postTestProject = async () => {
    let data = {
      title: "Test Project",
      subtitle: "Test Subtitle",
      description: "Test description",
      tags: 'hello,hello2,hello3',
      link: 'https://diegogtz.dev',
      shown: true
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    await fetch('http://localhost:8080/projects/new', {
      method: "POST",
      body: JSON.stringify(data),
      headers: myHeaders
    })
  }

  return (
    <p onClick={() => postTestProject()}>
      CREATE TEST PROJECT
    </p>
  );
};