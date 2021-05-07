import { useBoolean } from "@/hooks";

it("outputs correctly", () => {
    let condition = true;
    const { useFlag } = useBoolean(condition);

    const resultA = useFlag("a", "b");
    expect(resultA).toBe("a");
});
