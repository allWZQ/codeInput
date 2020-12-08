import { useEffect, useState } from "react";

export const useCountDown = (initNum: number) => {
  const [num, setNum] = useState<number>(initNum);
  useEffect(() => {
    if (num > 0) {
      setTimeout(() => {
        setNum(num - 1);
      }, 1000);
    }
  });
  return { num, setNum };
};
export const useLoading = () => {
  const [loading, setLoading] = useState(false)

  return { loading, setLoading }
}
