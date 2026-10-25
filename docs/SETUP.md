# Set up your Studio

About 15 minutes, once. You need your Flexmls login, a credit card for Anthropic, and a free Cloudflare account.

Just want cards, signs, flyers and signatures? Skip all of this and open the Studio. Setup is only for the AI tools and the MLS tools (CMA report, Listing Video).

## 1. Get your AI key (for Create Anything, captions, CMA write-ups)

1. Go to **console.anthropic.com** and create an account.
2. Under **Billing**, add a payment method. You pay Anthropic directly for what you use.
3. Under **Limits**, set a monthly spend limit you are comfortable with.
4. Under **API Keys**, click **Create Key**, name it "iMath Studio", and copy it.

If your Anthropic account belongs to a company organization, the admin may have turned off browser access. The Test button in step 4 will say so.

## 2. Get your MLS key (for CMA reports and Listing Video photos)

1. Sign in to the **Spark Datamart** with your Flexmls login: sparkplatform.com, then Datamart.
2. Find the plans offered by **realMLS**.
3. Pick a plan that covers **all listings** in the MLS, not only your own. A plan limited to your own listings will not give you comps.
4. Accept the terms and pay any fee realMLS charges. When it is approved you get an email with an **access token**. Keep it private; it is like a password.

No plan available, or not approved yet? You can still use the CMA and Listing Video tabs by typing details and uploading photos.

## 3. Deploy your personal MLS proxy

Spark does not allow your token inside a web page, so it lives in a tiny server that only you control. Follow [PROXY.md](PROXY.md). You end up with:

- a proxy address like `https://imath-mls.yourname.workers.dev`
- a passcode you chose

## 4. Connect the Studio

1. Open the Studio and click **Connect your accounts** (bottom right).
2. Paste your **Anthropic API key**, then click **Test**. You should see "Connected."
3. Paste your **proxy address** and **passcode**, then click **Test**. You should see "Your MLS answered."
4. Click **Save**.

Your keys are saved only in this browser. On a new computer, connect again. To remove them, click **Remove everything from this browser**.

## 5. Import the team roster

Elliot sends you a file called `roster.json`. In **Connections**, under **Team roster**, click **Import roster file** and choose it. The Studio reloads with the team and the loan officers filled in. Keep the file private; it has everyone's contact details.

## 6. Fill in your profile

Pick yourself under **Who are you?**, then check your name, title, phone, email, website and photo. These print on everything you make. Not on the roster yet? Choose **I am not on the list yet** and type your details.

## Problems

| You see | Do this |
|---|---|
| "Your Anthropic API key was rejected." | Copy the key again from console.anthropic.com. Check billing is set up. |
| "Could not reach Anthropic from this browser." | Your organization may block browser access. Use a personal Anthropic account. |
| "Wrong passcode" | Use the exact passcode you set on the proxy. |
| "Origin not allowed" | Set `ALLOWED_ORIGIN` on your proxy to the Studio address (see PROXY.md). |
| "Proxy passcode or Spark key rejected." | Your Spark token may be wrong or expired. Set it again on the proxy. |
| Comps are missing or only show your listings | Your Datamart plan only covers your own listings. Choose a full-MLS plan. |
