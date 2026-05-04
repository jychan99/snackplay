import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import Input from "./Input";

// 설정
const meta = {
  title: "ui/Input",
  component: Input,
  parameters: {
    layout: "centered", // centered → 가운데 정렬 fullscreen → 전체 화면 padded → 여백 있음
  },

  tags: ["autodocs"], // 자동문서 생성

  args: { onClick: fn() },

} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: "md",
    placeholder: "테스트",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    width: "md",
      placeholder: "테스트",
    disabled: true,
  },
};

