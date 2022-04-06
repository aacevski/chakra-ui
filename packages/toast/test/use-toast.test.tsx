import {
  renderInteractive,
  screen,
  waitForElementToBeRemoved,
} from "@chakra-ui/test-utils"
import * as React from "react"
import { ToastProvider, useToast } from "../src"

describe("useToast", () => {
  beforeEach(async () => {
    const toasts = screen.queryAllByRole("listitem")
    await Promise.all(toasts.map((toasts) => waitForElementToBeRemoved(toasts)))
  })

  it("should accept default options", async () => {
    const title = "Yay!"

    const description = "Something awesome happened"

    const TestComponent = () => {
      const toast = useToast()
      return (
        <button onClick={() => toast({ title, description })}>Toast</button>
      )
    }

    const { user } = renderInteractive(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    const button = await screen.findByText("Toast")
    user.click(button)

    const allByTitle = await screen.findAllByRole("alert", { name: title })
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })

  it("should override default options", async () => {
    const defaultTitle = "Yay!"
    const defaultDescription = "Something awesome happened"

    const title = "Hooray!"
    const description = "Something splendid happened"

    const TestComponent = () => {
      const toast = useToast({
        title: defaultTitle,
        description: defaultDescription,
      })
      return (
        <button onClick={() => toast({ title, description })}>Toast</button>
      )
    }

    const { user } = renderInteractive(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>,
    )

    const button = await screen.findByText("Toast")
    user.click(button)

    const allByTitle = await screen.findAllByRole("alert", { name: title })
    const allByDescription = await screen.findAllByText(description)

    expect(allByTitle).toHaveLength(1)
    expect(allByDescription).toHaveLength(1)
  })
})
