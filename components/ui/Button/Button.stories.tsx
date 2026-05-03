import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { fn } from "storybook/test";

import Button from "./Button";

// 설정
const meta = {
  title: "ui/Button",
  component: Button,
  parameters: {
    layout: "centered", // centered → 가운데 정렬 fullscreen → 전체 화면 padded → 여백 있음
  },

  tags: ["autodocs"], // 자동문서 생성

  argTypes: {
    // color: { control: "color" },
    //UI에서 props를 조작할 수 있게 만드는 설정
    // 예:
    // color picker 생성
    // dropdown 생성
    // slider 생성
    // 즉 Storybook UI에서 직접 props 변경 가능
  },

  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "md",
    children: "Button",
    disabled: false,
  },
};

export const Large: Story = {
  args: {
    variant: "outline",
    size: "lg",
    children: "Button",
    disabled: false,
  },
};

export const Small: Story = {
  args: {
    variant: "outline",
    size: "sm",
    children: "Button",
    disabled: false,
  },
};
