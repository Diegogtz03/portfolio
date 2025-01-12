"use client";

export const EmailBtn = () => {
  const handleEmail = async () => {
    await fetch("/api/email", {
      method: "POST",
      body: JSON.stringify({
        email: "diego_gtz_t@hotmail.com",
        subject: "hello world",
        message: "<p>it works!</p>",
      }),
    });
  };

  return (
    <button onClick={handleEmail} className="text-white">
      Email
    </button>
  );
};
